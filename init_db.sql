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

-- Insert data into warehouse table
INSERT INTO warehouse (name, city, state, current_capacity, max_capacity) VALUES
    ('Sunset Storage', 'Los Angeles', 'CA', 1500, 20000),
    ('Chicago Cold Storage', 'Chicago', 'IL', 800, 12000),
    ('Houston Heavy Storage', 'Houston', 'TX', 2000, 25000),
    ('Phoenix Valley Depot', 'Phoenix', 'AZ', 1300, 18000),
    ('Seattle Shipping Center', 'Seattle', 'WA', 1700, 22000);

-- Insert data into category table
INSERT INTO category (name, description) VALUES
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Literature and reading materials'),
    ('Toys', 'Children’s toys and games'),
    ('Tools', 'Hardware and tools for construction'),
    ('Health', 'Health and beauty products');

-- Insert data into product table
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

-- Insert data into customer table
INSERT INTO customer (first_name, last_name, email, phone, address) VALUES
    ('Tom', 'Brown', 'tom.brown@example.com', '2025551234', '321 Birch St'),
    ('Emily', 'Davis', 'emily.davis@example.com', '3015555678', '654 Cedar St'),
    ('Michael', 'Wilson', 'michael.wilson@example.com', '2025558765', '987 Elm St'),
    ('Sarah', 'Taylor', 'sarah.taylor@example.com', '5715554321', '258 Willow St'),
    ('David', 'Anderson', 'david.anderson@example.com', '2025559876', '369 Ash St');

-- Insert data into inventory table for different warehouses and products

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

-- Insert data into the order table
INSERT INTO "order" (customer_id, inventory_id, quantity, per_item_cost, order_date) VALUES
    (1, 1, 2, 19.99, '2024-07-03'),
    (2, 2, 1, 49.99, '2024-07-05'),
    (3, 3, 3, 14.99, '2024-07-07'),
    (4, 4, 5, 29.99, '2024-07-09'),
    (5, 5, 2, 12.99, '2024-07-11'),
    (1, 6, 4, 15.99, '2024-07-13'),
    (2, 7, 1, 29.99, '2024-07-15'),
    (3, 8, 2, 9.99, '2024-07-17'),
    (4, 9, 6, 19.99, '2024-07-19'),
    (5, 10, 3, 49.99, '2024-07-21'),
    (1, 1, 1, 14.99, '2024-07-23'),
    (2, 2, 7, 29.99, '2024-07-25'),
    (3, 3, 2, 12.99, '2024-07-27'),
    (4, 4, 3, 15.99, '2024-07-29'),
    (5, 5, 4, 29.99, '2024-07-31'),
    (1, 6, 1, 9.99, '2024-08-02'),
    (2, 7, 5, 19.99, '2024-08-04'),
    (3, 8, 3, 49.99, '2024-08-06'),
    (4, 9, 2, 14.99, '2024-08-08'),
    (5, 10, 1, 29.99, '2024-08-10'),
    (1, 1, 3, 12.99, '2024-08-12'),
    (2, 2, 4, 15.99, '2024-08-14'),
    (3, 3, 2, 29.99, '2024-08-16'),
    (4, 4, 5, 9.99, '2024-08-18'),
    (5, 5, 3, 19.99, '2024-08-20'),
    (1, 6, 6, 49.99, '2024-08-22'),
    (2, 7, 1, 14.99, '2024-08-24'),
    (3, 8, 7, 29.99, '2024-08-26'),
    (4, 9, 2, 12.99, '2024-08-28'),
    (5, 10, 3, 15.99, '2024-08-30'),
    (1, 1, 5, 29.99, '2024-09-01'),
    (2, 2, 2, 9.99, '2024-09-03'),
    (3, 3, 4, 19.99, '2024-09-05'),
    (4, 4, 3, 49.99, '2024-09-07'),
    (5, 5, 1, 14.99, '2024-09-09'),
    (1, 6, 7, 29.99, '2024-09-11'),
    (2, 7, 2, 12.99, '2024-09-13'),
    (3, 8, 6, 15.99, '2024-09-15'),
    (4, 9, 4, 29.99, '2024-09-17'),
    (5, 10, 5, 9.99, '2024-09-19'),
    (1, 1, 3, 19.99, '2024-09-21'),
    (2, 2, 2, 49.99, '2024-09-23'),
    (3, 3, 5, 14.99, '2024-09-25'),
    (4, 4, 7, 29.99, '2024-09-27'),
    (5, 5, 4, 12.99, '2024-09-29'),
    (1, 6, 6, 15.99, '2024-10-01'),
    (2, 7, 2, 29.99, '2024-10-03'),
    (3, 8, 1, 9.99, '2024-10-05'),
    (4, 9, 3, 19.99, '2024-10-07'),
    (5, 10, 4, 49.99, '2024-10-09');