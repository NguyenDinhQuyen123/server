# test_api.py
import unittest
import requests

BASE_URL = "https://server-zitn.onrender.com"

class TestCartAPI(unittest.TestCase):

    def test_add_to_cart_success(self):
        payload = {"product_id": "sp1", "quantity": 2}
        res = requests.post(f"{BASE_URL}/cart/add", json=payload)
        self.assertEqual(res.status_code, 200)
        self.assertIn("cart", res.json())

    def test_add_to_cart_missing_product_id(self):
        res = requests.post(f"{BASE_URL}/cart/add", json={"quantity": 1})
        self.assertEqual(res.status_code, 400)
        self.assertIn("error", res.json())


if __name__ == '__main__':
    unittest.main()
