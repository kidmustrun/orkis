const axios = require("axios").default;
const URL_BASE = "https://reqres.in/api";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const loginUser = (user) => new Promise((resolve, reject) => {
  console.log(`${URL_BASE}/login`, user, requestHeaders)
  axios
      .post(`${URL_BASE}/login`, user, requestHeaders)
      .then(function (resp) {
        const token = resp.data.token
      localStorage.setItem('user-token', token) // store the token in localstorage
      resolve(resp)
    }).catch(function (err) {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      reject(err)
    });
  });