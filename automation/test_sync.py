import copy
import datetime as dt
import unittest
from sync import due, validate

class SyncTests(unittest.TestCase):
    def setUp(self):
        self.card = dict(title='Existing',type='Prototype',text='Working tool.',stack='PYTHON',repo='',status='PROTOTYPE')
        self.evidence = {'repositories':[{'repo':'reality-commit'}]}
    def test_seasonal_schedule(self):
        for month, hour in [(1,10),(7,9)]:
            # Both dates are Sundays in 2026.
            day = 4 if month == 1 else 5
            self.assertTrue(due(dt.datetime(2026,month,day,hour,tzinfo=dt.timezone.utc)))
            self.assertFalse(due(dt.datetime(2026,month,day,hour+1,tzinfo=dt.timezone.utc)))
    def test_preserves_curated_cards(self):
        item = dict(self.card, text='Invented replacement')
        with self.assertRaises(ValueError):validate({'projects':[item]},[self.card],self.evidence)
    def test_rejects_unverified_repository(self):
        item = dict(self.card,title='New',repo='private-repo')
        with self.assertRaises(ValueError):validate({'projects':[self.card,item]},[self.card],self.evidence)
    def test_accepts_verified_addition(self):
        item = dict(self.card,title='Reality Commit',repo='reality-commit')
        self.assertEqual(len(validate({'projects':[self.card,item]},[self.card],self.evidence)),2)
    def test_rejects_duplicate_repository(self):
        one = dict(self.card,title='One',repo='reality-commit')
        two = dict(one,title='Two')
        with self.assertRaises(ValueError):validate({'projects':[self.card,one,two]},[self.card],self.evidence)
    def test_rejects_markup(self):
        item = dict(self.card,title='<script>',repo='reality-commit')
        with self.assertRaises(ValueError):validate({'projects':[self.card,item]},[self.card],self.evidence)

if __name__ == '__main__':unittest.main()
