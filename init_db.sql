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

-- Insert data into warehouse table with capacities over 10000
INSERT INTO warehouse (name, city, state, current_capacity, max_capacity) VALUES
    ('Capital Storage', 'Washington', 'DC', 1200, 15000),
    ('Baltimore Bay Warehouse', 'Baltimore', 'MD', 1300, 16000),
    ('Philly Central Depot', 'Philadelphia', 'PA', 1400, 17000),
    ('Atlanta Amazon Warehouse', 'Atlanta', 'GA', 1500, 50000);

-- Insert data into category table
INSERT INTO category (name, description) VALUES
    ('Electronics', 'Electronic goods and devices'),
    ('Furniture', 'Home and office furniture'),
    ('Food', 'Groceries and consumables');

-- Insert data into product table
INSERT INTO product (name, description, price, category_id, sku) VALUES
    ('Laptop', 'Portable computer', 899.99, 1, 'ELEC001'),
    ('Smartphone', 'Mobile phone', 499.99, 1, 'ELEC002'),
    ('Desk', 'Wooden office desk', 299.99, 2, 'FURN001'),
    ('Chair', 'Ergonomic office chair', 199.99, 2, 'FURN002'),
    ('Apples', 'Fresh apples', 1.99, 3, 'FOOD001'),
    ('Bread', 'Whole grain bread', 2.99, 3, 'FOOD002');

-- Insert data into customer table
INSERT INTO customer (first_name, last_name, email, phone, address) VALUES
    ('John', 'Doe', 'john.doe@example.com', '5715551234', '123 Maple St'),
    ('Jane', 'Smith', 'jane.smith@example.com', '2305555678', '456 Oak St'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', '2015558765', '789 Pine St');

-- Warehouse 1: Capital Storage
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (1, 1, 400, CURRENT_DATE),
    (2, 1, 300, CURRENT_DATE),
    (5, 1, 500, CURRENT_DATE);

-- Warehouse 2: Baltimore Bay Warehouse
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (3, 2, 450, CURRENT_DATE),
    (4, 2, 450, CURRENT_DATE),
    (6, 2, 400, CURRENT_DATE);

-- Warehouse 3: Philly Central Depot
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (5, 3, 600, CURRENT_DATE),
    (6, 3, 800, CURRENT_DATE);

-- Warehouse 4: Atlanta Amazon Warehouse
INSERT INTO inventory (product_id, warehouse_id, stock, last_update) VALUES 
    (1, 4, 600, CURRENT_DATE),
    (2, 4, 900, CURRENT_DATE);