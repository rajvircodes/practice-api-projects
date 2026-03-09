# Movie Listing API

A simple RESTful API for managing movie data. This project allows users to retrieve, create, update, and delete movie records.

## Features

* Get a list of all movies
* Get details of a specific movie
* Add a new movie
* Update existing movie details
* Delete a movie

## Tech Stack

* Node.js
* Express.js
* MongoDB / MySQL
* REST API

## 📦 Installation

1. Clone the repository
   git clone https://github.com/yourusername/movie-listing-api.git

2. Navigate to the project directory
   cd movie-listing-api

3. Install dependencies
   npm install

4. Start the server
   npm start

## 📡 API Endpoints

GET /movies
Returns all movies

GET /movies/:id
Returns a single movie by ID

POST /movies
Creates a new movie

PUT /movies/:id
Updates a movie

DELETE /movies/:id
Deletes a movie

## 📄 Example Movie Object

{
"id": 1,
"title": "Inception",
"director": "Christopher Nolan",
"year": 2010,
"genre": "Sci-Fi"
}

## 📜 License

This project is licensed under the MIT License.
