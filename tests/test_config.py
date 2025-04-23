# test_common.py
import unittest

def validate_quantity(qty):
    if qty < 0:
        raise ValueError("Quantity must be >= 0")
    return True


class TestCommon(unittest.TestCase):
    def test_valid_quantity(self):
        self.assertTrue(validate_quantity(3))

    def test_invalid_quantity(self):
        with self.assertRaises(ValueError):
            validate_quantity(-1)


if __name__ == '__main__':
    unittest.main()
