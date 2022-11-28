CREATE DATABASE ecommerce;

USE ecommerce
CREATE TABLE
    IF NOT EXISTS category(
        categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        categoryName VARCHAR(100)
    );

CREATE TABLE
    IF NOT EXISTS users (
        userId INT NOT NULL AUTO_INCREMENT,
        userName VARCHAR(255) NOT NULL,
        userEmail VARCHAR(255) NOT NULL,
        userPass VARCHAR(255) NOT NULL,
        PRIMARY KEY (userId, userEmail)
    );

CREATE TABLE
    IF NOT EXISTS products (
        productId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        categoryId INT NOT NULL,
        productName VARCHAR(45) NOT NULL,
        price FLOAT NOT NULL,
        productImage VARCHAR(255),
        productDescription VARCHAR(255),
        FOREIGN KEY (categoryId) REFERENCES category (categoryId)
    );

CREATE TABLE
    IF NOT EXISTS orders(
        orderId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        quantity INT NOT NULL,
        productId INT NOT NULL,
        userEmail VARCHAR(255) NOT NULL,
        FOREIGN KEY (productId) REFERENCES products (productId)
    );
