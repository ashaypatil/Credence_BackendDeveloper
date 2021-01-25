//packages required
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//instantiate express app
const app = express();

//mongodb connectivity code
mongoose.connect('mongodb+srv://ashay:khl6Z1EP1YXLv3ho@cluster0.jaad9.mongodb.net/movie_portal?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Connection failed');
  });

//adding middlewares to be used for the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//route to add hard-coded data 
app.get("/adddefaultmovie", (req, res, next) => {
  const Movie = require('./models/movie');
  const movie = new Movie({
    name: "Avengers: Endgame",
    img: "https://bit.ly/2Pzczlb",
    summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
  });
  movie.save();
  res.status(201).json({
    message: 'Movie added successfully'
  });

});

//route to your add data
app.post("/addmovie", (req, res, next) => {
  const Movie = require('./models/movie');

  //population data from request object into movie model object
  const movie = new Movie({
    name: req.query.name,
    img: req.query.img,
    summary: req.query.summary,
  });
  movie.save();
  res.status(201).json({
    message: 'Movie added successfully'
  });

});

//route or endpoint to retrieve data in json
app.get("/getallmovies", (req, res, next) => {
  const Movie = require('./models/movie');
  Movie.find().then(document => {

    res.status(201).send(document);
  });
});

//middle to handle error
app.use((err, req, res, next) => {
  res.status(err.status).send("something broke");
})


module.exports = app;
