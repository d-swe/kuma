## New Features
----
- Customer info can be created and retrieved for orders
- Categories can be created for products
- Products will be standalone and not hold any quantity info
- Inventory is the middle man for which warehouses a products is stored and how many
- Order item will automatically be created when an order is created
- Order item is the middle man for modifying inventory stock and main info for orders

## TODO
- [ ] Product
	- [ ] Product:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find product by id
			- [ ] name, category, price, sku
		- [ ] find product by category id
- [ ] Inventory
	- [ ] Inventory:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find inventory by id
			- [ ] warehouse, product, current stock
- [x] Warehouse
	- [x] Warehouse:
		- [x] Add / change new variables
	- [x] R/S/C:
		- [x] find warehouse by id
			- [x] name, location, max capacity
- [ ] Category
	- [ ] Category:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find category by id
			- [ ] name, description
- [ ] Order
	- [ ] Order:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find order by id
			- [ ] customer info, order date, total cost
- [ ] Customer
	- [ ] Customer:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find customer by id
			- [ ] name, address, contact info
- [ ] OrderItem
	- [ ] OrderItem:
		- [ ] Add / change new variables
	- [ ] R/S/C:
		- [ ] find orderItem by id
		- [ ] find a product with inventory id
		- [ ] decrement count of inventory stock