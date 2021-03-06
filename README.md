# MapJourney
_MapJourney_ is a platform that extends the functionalities of Google Maps and allow users to map out their future travels with customization, PLUS give them the ability to route using multiple modes of transportation. 

More specifically, for any given trip with many destinations, Google Maps only allows selection of one type of transportation at a time, but _MapJourney_ allows users to alternate between the different types (i.e. driving, walking, bicycling, and transit) simultaneously and with unseeming ease. 

**_Video Demo_**: https://drive.google.com/file/d/1igYn9z4X_KZ52tdOgRM7OTgkPOYGtuPk/view?usp=sharing

---

**_Tech Stack_**: React.js, Express.js, MySQL, Node.js 

**_APIs_**: Yelp, Google Maps, Google Directions, Google Geocode, Auth0

**_Project Prep Doc_**: https://docs.google.com/document/d/1ryxxTT-nnkaT-_sseAQJy4BhmTLMEmTBLJt4FqV0zG0/edit?usp=sharing

**_Techtonica Final Project Outline_**: https://github.com/Techtonica/curriculum/blob/master/projects/final-project/final-project.md

---

### Pre-setup: 
1. Download [Sequel Pro](http://www.sequelpro.com/)
2. Install mysql. If you have brew, run `brew install mysql`, then start with `brew services start mysql` (otherwise you can download [MySQL](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html)) 
3. Add your user and password to the "my.cnf" file:

    - `cd ../../usr/local/etc`
    - `code my.cnf` (vscode), `atom my.cnf` (atom)
    - Add the following: 

    ```
    [client]
    user = root
    password = <your-password>
    ```
    - `cd ~/desktop`

### Application Setup: 

1. Clone this repo to your local machine

    `git clone https://github.com/vsan21/MapJourney.git`

2. Go into that project folder

    `cd MapJourney`
    
3. Create an .env file

    `touch .env` 

4. Inside of the .env file, add: 

    ```
    YELP_API_KEY=<Your-Yelp-API-Key>
    GOOGLE_API_KEY=<Your-Google-API-Key>
    MYSQL_KEY=<Your-SQL-Key>
    ```
    - Yelp API:  https://www.yelp.com/developers/faq
    - Google Maps API: https://cloud.google.com/maps-platform/
    - You can set your own SQL Key to secure your database, otherwise it can be `""`

5. Install all dependencies
    
    `npm i && cd client && npm i && cd ..`
    
    or 
    
    `yarn && cd client && yarn && cd ..`

6. Run `yarn start` or `npm start` (this will run both the client and server) 

7. Open a new terminal tab, run the bash script file to **_create_** the database/tables:

    - `cd database` 
    - `chmod +rwx ./setup.sh` 
    - `./setup.sh` 

8. To view the database on Sequel Pro. Enter the following to establish a connection: 

    ```
    Host: 127.0.0.1
    Username: root
    Password: <your-password>
    ```

8. If you want to **_teardown_** the database or any specific table(s) later: 

    - `chmod +rwx ./teardown.sh`
    - `./teardown.sh`

---

### Current features: 
- [x] Backend
- [x] Homepage search page (through Yelp to find attractions, restaurants, hikes, etc.)
- [x] Results display on new page
- [x] Button for user to "Add to Map"
- [x] Map creates markers of user's places (more defined -> now it will only show the places of the logged in user's saved pins, as opposed to every result from all users) 
- [x] Map markers have infowindow 
- [x] Auth0: login, signup, logout, and user profile 
- [x] Custom map category icons 
- [x] Route travel between pins based on multiple modes of transportation
- [x] Change the color of the different travel routes 
- [x] Display directions summary on side panel (itinerary-like list) 
- [x] Deploy on Heroku
- [ ] Fix Heroku H10 crash error

### Later features: 
- Save user's routes into db 
- Allow user to delete pins & modify routes
- Save multiple maps of different cities/countries 
- Allow user to go into "Storymode" 
    - Mark a place as "visited"
    - Upload photos & videos 
    - Summarize trip based on given photos/videos 
