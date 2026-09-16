from __future__ import annotations

import contextlib
import io
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock
import zipfile

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
import release_check  # noqa: E402


class ReleaseCheckTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.repo = Path(self.temporary.name) / "repo"
        self.repo.mkdir()
        for directory in ("scripts", "infrastructure", "functions"):
            shutil.copytree(ROOT / directory, self.repo / directory, ignore=shutil.ignore_patterns("__pycache__", "*.pyc"))

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def starter(self) -> None:
        with zipfile.ZipFile(ROOT / "tests/fixtures/reviewed-starter-public.zip") as archive:
            archive.extractall(self.repo / "public")

    def check(self) -> None:
        # Run the actual validators, not a mocked command list or a mode-only assertion.
        with mock.patch.object(release_check, "ROOT", self.repo), contextlib.redirect_stdout(io.StringIO()):
            release_check.validate_public_site(sys.executable)

    def test_reviewed_starter_passes_strict_digest_check(self) -> None:
        self.starter()
        self.check()

    def test_valid_production_uses_complete_production_checks(self) -> None:
        shutil.copytree(ROOT / "tests/fixtures/valid-site", self.repo / "public")
        self.check()

    def test_mutated_starter_cannot_use_relaxed_validation(self) -> None:
        self.starter()
        with (self.repo / "public/index.html").open("a") as stream:
            stream.write("\n<!-- unreviewed starter change -->\n")
        with self.assertRaises(subprocess.CalledProcessError):
            self.check()

    def test_starter_relabelled_production_must_pass_production_gates(self) -> None:
        self.starter()
        path = self.repo / "public/site-manifest.json"
        manifest = json.loads(path.read_text())
        manifest["stage"] = "production"
        path.write_text(json.dumps(manifest))
        with self.assertRaises(subprocess.CalledProcessError):
            self.check()

    def test_unknown_stage_is_rejected_instead_of_defaulting_to_starter(self) -> None:
        self.starter()
        path = self.repo / "public/site-manifest.json"
        manifest = json.loads(path.read_text())
        manifest["stage"] = "production-typo"
        path.write_text(json.dumps(manifest))
        with self.assertRaises(ValueError):
            self.check()


if __name__ == "__main__":
    unittest.main()
