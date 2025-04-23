import unittest

class ShoppingCart:
    def __init__(self):
        self.items = {}

    def add_item(self, product_id, quantity=1, stock=10):
        if stock <= 0:
            raise ValueError("Out of stock")
        if product_id in self.items:
            self.items[product_id] += quantity
        else:
            self.items[product_id] = quantity

    def update_item(self, product_id, quantity):
        if quantity == 0:
            self.items.pop(product_id, None)
        elif quantity < 0:
            raise ValueError("Invalid quantity")
        else:
            self.items[product_id] = quantity

    def remove_item(self, product_id):
        self.items.pop(product_id, None)

    def get_items(self):
        return self.items

    def clear(self):
        self.items.clear()

    def checkout(self):
        if not self.items:
            raise ValueError("Cart is empty")
        order = self.items.copy()
        self.clear()
        return order


class TestCart(unittest.TestCase):
    def setUp(self):
        self.cart = ShoppingCart()

    def test_add_item(self):
        self.cart.add_item("sp1", 1)
        self.assertIn("sp1", self.cart.get_items())

    def test_update_item(self):
        self.cart.add_item("sp1", 1)
        self.cart.update_item("sp1", 3)
        self.assertEqual(self.cart.get_items()["sp1"], 3)

    def test_remove_item(self):
        self.cart.add_item("sp1", 2)
        self.cart.remove_item("sp1")
        self.assertNotIn("sp1", self.cart.get_items())

    def test_checkout(self):
        self.cart.add_item("sp2", 2)
        result = self.cart.checkout()
        self.assertEqual(result, {"sp2": 2})
        self.assertEqual(len(self.cart.get_items()), 0)


if __name__ == '__main__':
    unittest.main()

