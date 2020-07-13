const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getWeather = require("./utils/get_weather_util");
const app = express();
const port = process.env.PORT || 3000;

// Paths for express config
const pathToStatic = path.join(__dirname, "../public"); // Path to the static folder we want to server html from
const hbsViewsPath = path.join(__dirname, "../templates/views"); // Path to hbs views
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup static directory to server
app.use(express.static(pathToStatic)); //app.use() is used to configure the server to server html etc

// Setup handlebar engine and views location
app.set("view engine", "hbs"); // setting up hbs
app.set("views", hbsViewsPath);
hbs.registerPartials(partialsPath);

// We need to setup routes to serve up hbs views
app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    heading: "Weather",
    name: "Usman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    heading: "About",
    name: "Usman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    heading: "Help",
    message: "This is help message",
    name: "Usman",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    // If address is not provided in the query string, send back an error
    res.send({
      error: "Please provide an address",
    });
  } else {
    // geocode the address
    getWeather.geocode(req.query.address, (err, response) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      // Here we have the latitude and the longitude
      return getWeather.forecast(
        response.latitude,
        response.longitude,
        response.placeName,
        res
      );
    });
  }
});

// Need to come last
app.get("*", (req, res) => {
  res.render("404", {
    message: "404 page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
