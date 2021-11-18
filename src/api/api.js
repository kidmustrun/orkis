const axios = require("axios").default;
const URL_BASE = "http://57ef-95-165-9-250.ngrok.io";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const loginUser = (user) => {
  console.log(`${URL_BASE}/login`, user, requestHeaders)
  axios
      .post(`${URL_BASE}/login`, user, requestHeaders)
      .then(function (response) {
        console.log('Success', response);
    }).catch(function (error) {
        console.log(error);
    });
  }