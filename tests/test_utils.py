# test_utils.py
import unittest

def calculate_total(cart, price_map):
    return sum(cart[item] * price_map.get(item, 0) for item in cart)


class TestUtils(unittest.TestCase):
    def test_calculate_total(self):
        cart = {"sp1": 2, "sp2": 1}
        prices = {"sp1": 100000, "sp2": 150000}
        total = calculate_total(cart, prices)
        self.assertEqual(total, 350000)


if __name__ == '__main__':
    unittest.main()
