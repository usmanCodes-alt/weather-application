// To make a request from client side javascript we will use fetchAPI
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const firstParagraph = document.querySelector("#message");
const secondParagraph = document.querySelector("#message2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  firstParagraph.textContent = "";
  secondParagraph.textContent = "";

  firstParagraph.textContent = "Loading..";
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstParagraph.textContent = data.error;
      } else {
        firstParagraph.textContent = data.location;
        secondParagraph.textContent =
          "It's currently " +
          data.temperature +
          " degrees. " +
          "Humidity level is " +
          data.humidity +
          ". \nDescription: " +
          data.description;
      }
    });
  });
});
