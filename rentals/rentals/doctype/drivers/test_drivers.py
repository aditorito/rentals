# Copyright (c) 2025, BWH and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase


class TestDrivers(FrappeTestCase):
	def test_full_name_correctly_set(self):
		test_driver = frappe.new_doc("Drivers")
		test_driver.firstname = "John"
		test_driver.lastname = "Doe"
		test_driver.licensenumber = "HP32US1234"
		test_driver.phone_number = "9792282411"
		test_driver.save()

		self.assertEqual(test_driver.fullname, "John Doe")