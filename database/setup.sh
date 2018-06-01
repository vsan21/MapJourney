#!/bin/bash
set -e # Flag causes script to exit if there's an error

# Create database 
mysql -e "CREATE DATABASE tester;"
echo "Database successfully created!"

# Create tables
mysql -D tester -e "CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR (355) NOT NULL,
    date DATE NOT NULL
);"

mysql -D tester -e "CREATE TABLE maps (
    id INT PRIMARY KEY,
    title VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    user_id INT 
);"

mysql -D tester -e "CREATE TABLE pins (
    id INT PRIMARY KEY,
    place_name VARCHAR (355) NOT NULL,
    address VARCHAR (355) NOT NULL,
    map_category VARCHAR (355) NOT NULL,
    map_id INT 
);"

mysql -D tester -e "show tables;"
