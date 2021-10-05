# EVENT(FUL)

# Event(ful) Capstone Party Planning App



## Table of Content
* Overview
* Project Structure
* Usage 
* Development

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

### `back-end` Set Up and Deployment to Heroku

#### Basic App

**/back-end**

- `cd back-end`
- `npm install`
- `touch .env`

make sure you are on the same level as the `package.json` of the `back-end` directory

- `touch .env`

```
PORT=3333
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=postgres
PG_USER=postgres
PG_PASSWORD=""
```

- `npm run db_init`
- `npm run db_seed`

Test app locally. If it does not work locally, it will not work on Heroku.

Fix bugs.

When ready:

- `heroku create`
- `git add .`
- `git commit -m 'heroku deployment`
- `git push heroku main` - if this does not work, go to heroku dashboard => deployment and add the remote

ie `heroku git:remote -a <your-heroku-app-name>`

Open your heroku app. You should see the `Hello, world!` message.

#### Adding the Database on Heroku

In the heroku dashboard, go to `Overview` choose `configure add ons`

In the search bar `Quickly add add-ons` - search for `postgres` - choose `heroku postgres`

- Choose hobby dev
- Note: even though hobby dev is free, you may be required to provide a credit card
- In new view, click on `heroku Postgres / attached as DATABASE` => Settings

_** See ```./assets/heroku-database-dash.png``` in main repo.**_

You will need to make these key value pairs in your heroku app

**IMPORTANT**
The `keys` must match perfectly with what is in your `db/dbConfig.js` file and your local `.env`

- Open a new tab/window and go to the main page of your heroku app choose settings
- Reveal Config Variables
- Add the variables

**Note:** these are false credentials and given for example only:

```
PG_HOST=ec2-55-227-246-76.compute-1.amazonaws.com
PG_PORT=5432
PG_DATABASE=d9bq2bk2s4ilde
PG_USER=bcwmtakzkmkdxr
PG_PASSWORD=afb0a7a9396af1bac763154f5649e049ce280658bef0ded7efde6
```

_**See ```./assets/heroku-config-vars.png``` in main repo.**_

- make sure you are on the same directory level as your `package.json` of your `back-end` directory

Go back to the heroku database view => settings

- copy `Heroku CLI` (something like `heroku pg:psql postgresql-shaped-11685 --app mysterious-spires-49488`)
- paste into your terminal

- it should open a `pg shell`

Run the following:

- update the `\i ./db/prod_schema.sql` with the PG_DATABASE value from Heroku
- `\i ./db/prod_schema.sql`
  - success should say `CREATE TABLE`
- update the `\i ./db/prod_seed.sql` with the PG_DATABASE value from Herkou
- `\i ./db/prod_seed.sql`
  - success should say `INSERT 0 7`
- `\q`

This will insert the test table with the days of the week.

Later, when you have build out your app to have your schema and seed data, you will:

- edit the `db/schema.sql` file to be your own
- edit th `db/seed.sql` file to be your own
- reopen this shell and rerun these commands.

Note you should set up the

### `front-end` Set Up

**/front-end**

- `cd front-end`
- `npm install`

- `npm start`

**src/util/apiURL.js**

Replace the placeholder heroku app with your heroku app URL that you set up earlier

Make sure your back-end is still running. You should see an unordered list of the days of the week, coming from your back-end. If it does not work locally, it will not work when it is deployed. Keep debugging until it works

Go to netlify, choose `New site from Git`

- choose continuos deployment, GitHub.
- configure the netlify app on GitHub

Follow the prompts to add this project repo to Netlify
Once, authorized, configure to launch app from

- Base directory: `front-end`
- Build command: `npm run build`
- Publish directory: `build` (may appear as `front-end/build`)

![](./assets/netlify-deploy-settings.png)

## Usage
### Getting Started
* Fork this repo
* Clone the forked repository
* cd to the directory where you cloned it
* npm install to install dependencies

### Back-end
* cd into back-end (Must be same level as package.json)
* run npm install to install dependencies
* fix errors if any
* run nodemon

### Front-end
* open new terminal
* cd into directory where Event(ful) was cloned
* cd into front-end (Must be same level as package.json)
* run npm install to install dependencies
* fix errors if any
* run npm start
