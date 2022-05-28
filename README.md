** Simple NodeJS Rest API using JWT authentication and sequelize as ORM for SQLite db ** 

PS: **Postman request collection** can be found in the folder postman

Used technolgies: Nodejs, JWT Auth, Sequelize(ORM), Sqlite

implementing JWT authentication with Express, Sequelize and SQLite3.

## To run locally
+ `npm install --force`

+ This repository comes with a pre configured database
+ Run this only if you need to recreate the db, don't forget to delet ethe **database.sqlite3** 
  + `npx sequelize db:migrate` and `npx sequelize db:seed:all`

+ `npm start` to start server on localhost:3000

## Registering a new user in the data base
 + POST `/api/user/register`
 + Request body
  <code>{
    "username": "administrator",
    "email": "admin@admin.com",
    "password": "admin123"
  }`</code>

## This method will perform a login in the server
+ POST `/api/user/login`
+ Request body
 <code>{
   "email": "admin@admin.com",
   "password": "admin123"
 }</code>

## Now with the header **"auth-token": "Token"**
<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNjUzNzA0MzQ3LCJpYXQiOjE2NTM3MDM3NDd9.MiycyMr-FcFAhrJJZetXWgzCzYqvMKaQFZdYGIxEJPE</code>

## Getting all the available movies

+ GET `/api/movies`

## Getting a specific record by id
+ GET `/api/movies/:id`

## Will create a new movies in the database
+ POST `/api/movies`
+ Request body
 <code>
 {
   "title": "Movies test",
   "originalTitle": "Test of my movie",
   "description": "This is an example of update"
 }</code>

## This will update an existing movie(Specify only the properties you want to update)

+ PUT `/api/movies`
+ Request body
<code>
 {
   "id": 4,
   "title": "Spider man 3",
   "releaseYear": 2018
 }</code>

## Delete a movie by id
+ DELETE `/api/movies/:id`

## Data base structures(Users, Movies, Audits)

PS: This repository comes with a pre configured database, so you don't need to run the sql bellow...

<code>
CREATE TABLE `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `username` VARCHAR(255), `email` VARCHAR(255), `password` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
</code>
<br><br>
<code>
CREATE TABLE `Movies` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `description` VARCHAR(255), `title` VARCHAR(255), `originalTitle` VARCHAR(255), `releaseYear` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
</code>
<br><br>
<code>
CREATE TABLE `Audits` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `updatedTable` VARCHAR(255) NOT NULL, `action` VARCHAR(255) NOT NULL, `pkValue` VARCHAR(255) NOT NULL, `updatedBy` INTEGER NOT NULL, `updatedAt` DATETIME NOT NULL, `createdAt` DATETIME NOT NULL);
</code>
