-- Crear base de datos
CREATE DATABASE restaurant_db;

-- Usar la base de datos
USE restaurant_db;

-- Crear tabla para reservas
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    party_size INT NOT NULL
);

-- Crear tabla para pagos
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    expiration_date VARCHAR(5) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

-- Crear tabla para clientes
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);