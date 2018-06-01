# chmod + rwx ./setup.sh
# ./setup.sh

#!/bin/bash
set -e # Flag causes script to exit if there's an error

# Set variables
database_name='mapjourney'

# Create database 
mysql -e "CREATE DATABASE $database_name;"
echo "$database_name database was successfully created!"

# Create tables
mysql -D $database_name -e "CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR (355) NOT NULL,
    date DATE NOT NULL
);"

mysql -D $database_name -e "CREATE TABLE maps (
    id INT PRIMARY KEY,
    title VARCHAR (355) NOT NULL,
    location VARCHAR (355) NOT NULL,
    user_id INT 
);"

mysql -D $database_name -e "CREATE TABLE pins (
    id INT PRIMARY KEY,
    place_name VARCHAR (355) NOT NULL,
    address VARCHAR (355) NOT NULL,
    map_category VARCHAR (355) NOT NULL,
    map_id INT 
);"

mysql -D $database_name -e "show tables;"

