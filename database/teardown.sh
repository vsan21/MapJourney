# chmod +rwx ./teardown.sh
# ./teardown.sh

#!/bin/bash

# Set variables
database_name='mapjourney'

read -p "Do you want to drop the 'users' table? (y/n) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then 
    echo "Dropping table 'users'."
    mysql -D $database_name -e "DROP TABLE users"
fi

read -p "Do you want to drop the 'maps' table? (y/n) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then 
    echo "Dropping table 'maps'."
    mysql -D $database_name -e "DROP TABLE maps"
fi

read -p "Do you want to drop the 'pins' table? (y/n) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then 
    echo "Dropping table 'pins'."
    mysql -D $database_name -e "DROP TABLE pins"
fi

read -p "Do you want to drop the $database_name database? (y/n) " -n 1 -r
if [[ $REPLY =~ ^[Yy]$ ]]
then 
    echo "Dropping database $database_name."
    mysql -e "DROP DATABASE $database_name"
fi