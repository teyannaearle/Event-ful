# EVENT(FUL)

# Event(ful) Capstone Party Planning App



## Table of Content
* Overview
* Project Structure
* Usage 
* Contributers

## Overview
The amateur event planner doesn't have much experience finding vendors, keeping track of their vendor budget, or monitoring what vendors they like and which ones they have and haven't booked. These essential aspects of planning an event are spread out across different platforms. For example, one might use Google or Yelp to find and connect with vendors. However, there are many necessities to consider (catering, music, photography, etc.) when planning a party, which can lead to multiple search queries. In order to keep track of all of their booked vendor's information (contact, cost, etc.), what vendors they have and have yet to book, as well as if they are still on budget, they may use a Microsoft excel spreadsheet. But, Excel does not create organized checklists tailored to your events. Instead, you are required to create tables and populate them with information yourself. While these separate entities are okay on their own, for an individual who struggles with multitasking, it would take resiliency on their part to stay organized.
The Event(ful) App is a one-stop-shop for your vendor-booking organization. The app allow users to create an event that they are planning.
For the event that they are planning.

### Features

 User will be able to:
* Create a checklist of the vendors that they need
* Find vendors based off of their geolocation and access their contact information
* Favorite vendors that they would like to keep in mind
* Track what vendors they still need to book vs. what vendors they have already booked
* Easily access all of their booked vendor's contact information, as well as their favorite vendor's contact information
* Monitor their budget as they book vendors

### Technology Implemented
* Node.js and Express.js for the back-end.
* PostgreSQL handled our database management.
* Firebase was used to handle user athentication and authorization.
* React.js was used for front-end user-interaction.
* CSS and Toastify were used to style the app.

## Project Structure

```
├── README.md (what you are currently reading)
├── back-end (a basic express app)
├── front-end (a basic create-react-app)
└── package.json (necessary boilerplate for heroku deployment )
```

**NOTE:** - You will have 3 `package.json` files in this project

- **Top level** - necessary for heroku deployment: you don't need to do anything with this file, it is set up for you
- **back-end** - everything to do with the express/postgres backend
- **front-end** - everything to do with the create-react-app front-end


## Usage
### Getting Started
* Fork this repo
* Clone the forked repository
* `cd` to the directory where you cloned it
* `npm install` to install dependencies

### Back-end
* `cd` into back-end (Must be same level as `package.json`)
* run `npm install` to install dependencies
* fix errors if any
* run `nodemon`

### Front-end
* open new terminal
* `cd` into directory where Event(ful) was cloned
* `cd` into front-end (Must be same level as `package.json`)
* run `npm install` to install dependencies
* fix errors if any
* run `npm start`

## Contributors
* [Cassidy Beni](https://github.com/cassidybeni)
* [Angelina Ebreo](https://github.com/angelinaebreo)
* [Rayvon Finney-Pinkston](https://github.com/rayfinn55)
* [Teyanna Earle](https://github.com/teyannaearle)
* [Jasleen Villamil](https://github.com/jasleenv)
* [Raymond Udeogu](https://github.com/rayu117)
