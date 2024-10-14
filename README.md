## New Features
----
- Customer info can be created and retrieved for orders
- Categories can be created for products
- Products will be standalone and not hold any quantity info
- Inventory is the middle man for which warehouses a products is stored and how many
- Order item will automatically be created when an order is created
- Order item is the middle man for modifying inventory stock and main info for orders

## TODO
- [ ] OrderItem
	- [ ] R/S/C:
		- [ ] when orderitem is created decrement quantity from inventory stock
		- [ ] get price from current product price
- [ ] Order
	- [ ] get all the orderitems with orderid and get total price