import unittest
from scripts.publish_request import markdown, validate_features


class FeatureTests(unittest.TestCase):
    def setUp(self):
        self.wonder = {
            "title": "A luminous cloud", "caption": "An explanatory caption.",
            "image_url": "https://example.org/image.jpg", "source_url": "https://example.org/source",
            "alt": "Clouds of interstellar dust", "credit": "Observatory",
            "rights": "Public domain"
        }
        self.reflection = {
            "passage": "A verified short passage.", "author": "A thinker",
            "work": "Letters", "context": "The correct context.",
            "question": "What would change?", "source_url": "https://example.org/text"
        }

    def test_legacy_without_features(self):
        validate_features({})

    def test_valid_features(self):
        validate_features({"daily_wonder": self.wonder, "reflection": self.reflection})

    def test_invalid_image_link(self):
        with self.assertRaisesRegex(RuntimeError, "invalid image_url"):
            validate_features({"daily_wonder": {**self.wonder, "image_url": "javascript:alert(1)"}})

    def test_missing_image_rights(self):
        with self.assertRaisesRegex(RuntimeError, "missing rights"):
            validate_features({"daily_wonder": {**self.wonder, "rights": ""}})

    def test_reflection_requires_source(self):
        with self.assertRaisesRegex(RuntimeError, "missing source_url"):
            validate_features({"reflection": {**self.reflection, "source_url": ""}})

    def test_markdown_reading_order(self):
        edition = {
            "date": "2026-11-03", "dek": "A summary",
            "lead_story": {"headline": "Today's lead"},
            "sections": [
                {"id": "front-page", "title": "Front Page", "items": []},
                {"id": "ideas", "title": "Ideas", "items": []},
            ],
            "daily_wonder": self.wonder, "reflection": self.reflection,
            "worth_your_time": []
        }
        text = markdown(edition)
        marks = ["## Front Page", "## The Daily Wonder", "## Ideas",
                 "## Something to Sit With", "## Worth Your Time"]
        self.assertEqual([text.index(mark) for mark in marks], sorted(text.index(mark) for mark in marks))


if __name__ == "__main__":
    unittest.main()
