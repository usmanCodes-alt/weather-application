const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidXNtYW5naGFuaTEiLCJhIjoiY2tjaG5uYTBsMGk2MTJybzBwc2o0bjl1MiJ9.emae8cITYTPCHeWSvH5t8g&limit=1`;
  request({ url: url }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else {
      const data = JSON.parse(response.body);
      if (data.features.length == 0) {
        callback("Location not found", undefined);
      } else {
        callback(false, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          placeName: data.features[0].place_name,
        });
      }
    }
  });
};

const forecast = (latitude, longitude, location, responseToWeb) => {
  const url = `https://openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=439d4b804bc8187953eb36d2a8c26a02`;
  request({ url: url }, (error, response) => {
    if (error) {
      responseToWeb.send({
        error: "Unable to connect to weather services!",
      });
    } else {
      const data = JSON.parse(response.body);
      if (data.cod != 200) {
        responseToWeb.send({
          error: "Unexpected error occured!",
        });
      } else {
        responseToWeb.send({
          description: data.weather[0].description,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          location: location,
        });
      }
    }
  });
};

module.exports = {
  geocode: geocode,
  forecast: forecast,
};
