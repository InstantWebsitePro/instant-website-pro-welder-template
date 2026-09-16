import hashlib
import os
import re
import subprocess
import tempfile
import textwrap
import json
from pathlib import Path
import sys
import unittest
import zipfile


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = ROOT / "scripts"
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from validate_site import validate_json_schema  # noqa: E402


class WorkflowContractTests(unittest.TestCase):
    def test_phone_workflow_skips_only_the_exact_reviewed_placeholder(self) -> None:
        # An owner's upload replaces root website.zip before this suite runs.
        # Keep the reviewed skip sentinel separate from that mutable input.
        placeholder = ROOT / "tests/fixtures/reviewed-placeholder.zip"
        digest = hashlib.sha256(placeholder.read_bytes()).hexdigest()
        workflow = (ROOT / ".github" / "workflows" / "publish-phone-upload.yml").read_text(encoding="utf-8")
        self.assertEqual(digest, "542381329032f954d916f6c065e681669a0cc0d781d4ce8bebccd2744c93e2b6")
        self.assertIn(digest, workflow)
        self.assertEqual(workflow.count("steps.package-state.outputs.placeholder != 'true'"), 5)

    def test_phone_workflow_classifies_real_uploads_without_skipping_validation(self) -> None:
        workflow = (ROOT / ".github/workflows/publish-phone-upload.yml").read_text()
        section = workflow.split("- name: Recognize the untouched program placeholder", 1)[1]
        section = section.split("- name: Set up Python", 1)[0]
        script = textwrap.dedent(section.split("run: |\n", 1)[1])
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            production = root / "production.zip"
            with zipfile.ZipFile(production, "w", zipfile.ZIP_DEFLATED) as archive:
                source = ROOT / "tests/fixtures/valid-site"
                for path in sorted(source.rglob("*")):
                    if path.is_file():
                        archive.write(path, path.relative_to(source).as_posix())
            cases = [
                ("reviewed placeholder", (ROOT / "tests/fixtures/reviewed-placeholder.zip").read_bytes(), "true"),
                ("production upload", production.read_bytes(), "false"),
                ("malformed upload", b"invalid archive must reach importer rejection", "false"),
            ]
            for name, content, expected in cases:
                with self.subTest(name=name):
                    (root / "website.zip").write_bytes(content)
                    output = root / "output"
                    output.write_text("")
                    environment = {**os.environ, "GITHUB_OUTPUT": str(output), "GITHUB_STEP_SUMMARY": str(root / "summary")}
                    result = subprocess.run(["bash", "-e", "-o", "pipefail", "-c", script], cwd=root, env=environment, text=True, capture_output=True)
                    self.assertEqual(result.returncode, 0, result.stderr)
                    self.assertEqual(output.read_text().strip(), f"placeholder={expected}")

    def test_rollback_detects_the_staged_restore_against_head(self) -> None:
        workflow = (ROOT / ".github" / "workflows" / "rollback-website.yml").read_text(encoding="utf-8")
        self.assertIn("git diff --quiet HEAD -- public", workflow)
        self.assertNotIn("git diff --quiet -- public", workflow)

    def test_import_workflow_commits_an_added_only_file(self) -> None:
        workflow = (ROOT / ".github/workflows/publish-phone-upload.yml").read_text()
        section = workflow.split("- name: Commit the validated website files", 1)[1]
        script = textwrap.dedent(section.split("run: |\n", 1)[1])
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            bare, repo = root / "remote.git", root / "repo"
            def git(*args, cwd=repo):
                return subprocess.run(["git", *args], cwd=cwd, check=True, text=True, capture_output=True)
            git("init", "--bare", str(bare), cwd=root)
            repo.mkdir()
            git("init", "-b", "main")
            git("config", "user.name", "Fixture")
            git("config", "user.email", "fixture@example.invalid")
            (repo / "public").mkdir()
            (repo / "public/site-manifest.json").write_text('{"package_version":"test.1"}')
            git("add", ".")
            git("commit", "-m", "Initial public tree")
            git("remote", "add", "origin", str(bare))
            git("push", "origin", "HEAD:main")
            (repo / "public/new-file.txt").write_text("newly added output")
            environment = {**os.environ, "GITHUB_STEP_SUMMARY": str(root / "summary"), "GH_PUSH_TOKEN": ""}
            result = subprocess.run(["bash", "-e", "-o", "pipefail", "-c", script], cwd=repo, env=environment, text=True, capture_output=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(git("show", "main:public/new-file.txt", cwd=bare).stdout, "newly added output")

    def test_workflow_security_boundaries(self) -> None:
        for path in (ROOT / ".github/workflows").glob("*.yml"):
            workflow = path.read_text()
            self.assertNotIn("pull_request_target:", workflow)
            self.assertNotIn("git pull --rebase", workflow)
            for action in re.findall(r"uses: (\S+)", workflow):
                self.assertRegex(action, r"^[A-Za-z0-9_-]+/[A-Za-z0-9_-]+@[a-f0-9]{40}$")
            self.assertIn("persist-credentials: false", workflow)
        for name in ("publish-phone-upload.yml", "rollback-website.yml"):
            workflow = (ROOT / ".github/workflows" / name).read_text()
            self.assertIn("group: website-public-main", workflow)
            self.assertIn("if: github.ref == 'refs/heads/main'", workflow)

    def test_safe_legacy_url_handoff_matches_its_closed_schema(self) -> None:
        schema = json.loads((ROOT / "infrastructure" / "legacy-url-plan.schema.json").read_text(encoding="utf-8"))
        handoff = json.loads((ROOT / "handoff" / "LEGACY_URL_PLAN.json").read_text(encoding="utf-8"))
        self.assertEqual(validate_json_schema(handoff, schema), [])

    def test_public_contract_versions_are_v6(self) -> None:
        manifest = json.loads((ROOT / "public" / "site-manifest.json").read_text(encoding="utf-8"))
        version = json.loads((ROOT / "public" / "version.json").read_text(encoding="utf-8"))
        self.assertEqual(manifest["schema_version"], "6.0")
        schema = json.loads((ROOT / "infrastructure/site-manifest.schema.json").read_text())
        self.assertEqual(validate_json_schema(manifest, schema), [])
        self.assertEqual(manifest["workflow_version"], "6.0")
        self.assertEqual(manifest["repository_package_spec"], "6.0")
        self.assertEqual(version["workflow_version"], "6.0")
        self.assertEqual(version["repository_package_spec"], "6.0")


if __name__ == "__main__":
    unittest.main()
