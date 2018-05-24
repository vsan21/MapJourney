# MapJourney
Whether it be road trips, domestic, international, or even staycations in your own city, let MapJourney help you map out and route any future travels with ease, seemingly taking away the frustration out of travel planning and allowing you to enjoy your vacations once again. 

**_Tech Stack_**: React, Express, SQL, Node

**_Project Prep Doc_**: https://docs.google.com/document/d/1ryxxTT-nnkaT-_sseAQJy4BhmTLMEmTBLJt4FqV0zG0/edit?usp=sharing

**_Techtonica Final Project Outline_**: https://github.com/Techtonica/curriculum/blob/master/projects/final-project/final-project.md

---

### MySQL Database Setup: 
1. Download `Sequel Pro` (http://www.sequelpro.com/)
2. Open `Sequel Pro`, and enter the following to establish a connection: 

    ```
    Host: 127.0.0.1
    Username: root
    ```
3. Create a new database named `mapjourney`
4. Within the `mapjourney` database, create three tables: `users`, `maps`, `pins`

    - In `users` table, add these columns: `first_name`, `last_name`, `email`, `password`, `date`
    - In `maps` table, add these columns: `title`, `location`, `user_id` (user_id is a FK) 
    - In `pins` table, add these columns: `place_name`, `address`, `map_category`, `map_id` (map_id is a FK)

### Application Setup: 

1. Go onto your desktop and then clone this repo to your local machine

    `cd desktop` and `git clone https://github.com/vsan21/MapJourney.git`

2. Go into that project folder

    `cd MapJourney`
    
3. Create an .env file

    `touch .env` 

4. Inside of the .env file, add: 

    ```
    YELP_API_KEY=<Your-API-Key>
    MYSQL_KEY=<Your-SQL-Key>
    ```
    - Request your own Yelp API key at https://www.yelp.com/developers/faq

5. Install all dependencies
    
    `npm i && cd client && npm i && cd ..`
    
    or 
    
    `yarn && cd client && yarn && cd ..`

6. Run `yarn dev` (this will run both the client and server) 

---

### Current features: 
- Searching through Yelp to find attractions, restaurants, hikes, etc. 
- Ability to pin results onto a map with customized category icons 
- User log in/sign up

### Later features: 
- Route travel between pins based on multiple modes of transportation
- Save multiple maps of different cities/countries 
- Allow user to go into "Storymode" 
    - Mark a place as "visited"
    - Upload photos & videos 
    - Summarize trip based on given photos/videos 
