import json
from pathlib import Path
from urllib.parse import urlparse

import unittest

BASE = Path(__file__).resolve().parents[1]


class PreviewTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.archive = json.loads((BASE / "data/archive/2026-11-02.json").read_text(encoding="utf-8"))
        cls.preview = json.loads((BASE / "data/previews/2026-11-02-visual.json").read_text(encoding="utf-8"))

    def test_sample_is_not_published_data(self):
        self.assertTrue(self.preview["preview"])
        self.assertNotIn("preview", self.archive)
        self.assertNotIn("daily_wonder", self.archive)
        self.assertNotIn("reflection", self.archive)

    def test_same_articles_as_original(self):
        for field in ("date", "generated_at", "lead_story", "sections", "worth_your_time"):
            self.assertEqual(self.preview[field], self.archive[field], field)

    def test_visual_provenance_and_rights(self):
        image = self.preview["daily_wonder"]
        for field in ("title", "caption", "alt", "credit", "rights", "source_url", "image_url", "rights_url"):
            self.assertTrue(image.get(field), field)
        for field in ("source_url", "image_url", "rights_url"):
            self.assertEqual(urlparse(image[field]).scheme, "https")

    def test_reflection_provenance(self):
        q = self.preview["reflection"]
        for field in ("passage", "author", "work", "translator", "context", "question", "source_url"):
            self.assertTrue(q.get(field), field)
        self.assertEqual(urlparse(q["source_url"]).scheme, "https")


if __name__ == "__main__":
    unittest.main()
