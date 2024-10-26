-- Drop tables if they exist
DROP TABLE IF EXISTS "order" CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS warehouse CASCADE;

-- Create tables
CREATE TABLE warehouse (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    current_capacity INT,
    max_capacity INT
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    sku VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    stock INT NOT NULL,
    last_update DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE CASCADE
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity INT NOT NULL,
    per_item_cost DECIMAL(10, 2),
    order_date DATE NOT NULL
);

-- Insert more data into warehouse table
INSERT INTO warehouse (name, city, state, current_capacity, max_capacity) VALUES
    ('Sunset Storage', 'Los Angeles', 'CA', 1500, 20000),
    ('Chicago Cold Storage', 'Chicago', 'IL', 800, 12000),
    ('Houston Heavy Storage', 'Houston', 'TX', 2000, 25000),
    ('Phoenix Valley Depot', 'Phoenix', 'AZ', 1300, 18000),
    ('Seattle Shipping Center', 'Seattle', 'WA', 1700, 22000);

-- Insert more data into category table
INSERT INTO category (name, description) VALUES
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Literature and reading materials'),
    ('Toys', 'Children’s toys and games'),
    ('Tools', 'Hardware and tools for construction'),
    ('Health', 'Health and beauty products');

-- Insert more data into product table
INSERT INTO product (name, description, price, category_id, sku) VALUES
    ('T-shirt', 'Cotton t-shirt in various sizes', 19.99, 1, 'CLOTH001'),
    ('Jeans', 'Denim jeans with a comfortable fit', 49.99, 1, 'CLOTH002'),
    ('Novel', 'Best-selling fiction novel', 14.99, 2, 'BOOK001'),
    ('Cookbook', 'Collection of delicious recipes', 29.99, 2, 'BOOK002'),
    ('Action Figure', 'Superhero action figure', 12.99, 3, 'TOY001'),
    ('Board Game', 'Classic board game for family nights', 29.99, 3, 'TOY002'),
    ('Hammer', '16 oz hammer for carpentry', 15.99, 4, 'TOOL001'),
    ('Screwdriver Set', 'Set of precision screwdrivers', 29.99, 4, 'TOOL002'),
    ('Shampoo', 'Moisturizing shampoo for all hair types', 9.99, 5, 'HEALTH001'),
    ('Vitamins', 'Daily multivitamins for adults', 19.99, 5, 'HEALTH002');

-- Insert more data into customer table
INSERT INTO customer (first_name, last_name, email, phone, address) VALUES
    ('Tom', 'Brown', 'tom.brown@example.com', '2025551234', '321 Birch St'),
    ('Emily', 'Davis', 'emily.davis@example.com', '3015555678', '654 Cedar St'),
    ('Michael', 'Wilson', 'michael.wilson@example.com', '2025558765', '987 Elm St'),
    ('Sarah', 'Taylor', 'sarah.taylor@example.com', '5715554321', '258 Willow St'),
    ('David', 'Anderson', 'david.anderson@example.com', '2025559876', '369 Ash St');

-- Extended Inventory Data for Random Products and Warehouses
-- Warehouse 1: Sunset Storage
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (1, 1, 200, CURRENT_DATE),
    (2, 1, 150, CURRENT_DATE),
    (3, 1, 300, CURRENT_DATE),
    (4, 1, 180, CURRENT_DATE),
    (5, 1, 400, CURRENT_DATE);

-- Warehouse 2: Chicago Cold Storage
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (6, 2, 250, CURRENT_DATE),
    (7, 2, 320, CURRENT_DATE),
    (8, 2, 400, CURRENT_DATE),
    (9, 2, 500, CURRENT_DATE),
    (10, 2, 600, CURRENT_DATE);

-- Warehouse 3: Houston Heavy Storage
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (1, 3, 100, CURRENT_DATE),
    (2, 3, 220, CURRENT_DATE),
    (3, 3, 350, CURRENT_DATE),
    (6, 3, 480, CURRENT_DATE),
    (7, 3, 550, CURRENT_DATE);

-- Warehouse 4: Phoenix Valley Depot
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (8, 4, 250, CURRENT_DATE),
    (9, 4, 300, CURRENT_DATE),
    (10, 4, 120, CURRENT_DATE),
    (4, 4, 140, CURRENT_DATE),
    (5, 4, 260, CURRENT_DATE);

-- Warehouse 5: Seattle Shipping Center
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (1, 5, 310, CURRENT_DATE),
    (2, 5, 450, CURRENT_DATE),
    (3, 5, 320, CURRENT_DATE),
    (8, 5, 200, CURRENT_DATE),
    (9, 5, 150, CURRENT_DATE);