import html.parser
import pathlib
import unittest


ROOT = pathlib.Path(__file__).parents[1]


class StaticMarkupTests(unittest.TestCase):
    def test_index_has_unique_ids_and_required_controls(self):
        source = (ROOT / "index.html").read_text(encoding="utf-8")

        class IdParser(html.parser.HTMLParser):
            def __init__(self):
                super().__init__()
                self.ids = []

            def handle_starttag(self, tag, attrs):
                attributes = dict(attrs)
                if "id" in attributes:
                    self.ids.append(attributes["id"])

        parser = IdParser()
        parser.feed(source)
        self.assertEqual(len(parser.ids), len(set(parser.ids)))
        self.assertIn('id="ecgCanvas" role="img"', source)
        self.assertIn('id="trendsCanvas" role="img"', source)
        self.assertIn('app.clearStoredData()', source)
        self.assertIn('aria-label="Ana gezinme"', source)

    def test_sensitive_profile_fields_are_labeled(self):
        source = (ROOT / "index.html").read_text(encoding="utf-8")
        for field in ("profTC", "profConditions", "profMeds", "profEmergency1"):
            self.assertIn(f'for="{field}"', source)


if __name__ == "__main__":
    unittest.main()
