const axios = require("axios").default;
const URL_BASE = "http://b740-95-165-9-250.ngrok.io";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const loginUser = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}/login`, user, requestHeaders);
    axios
      .post(`${URL_BASE}/login`, user, requestHeaders)
      .then(function (resp) {
        const token = resp.headers.authorization;
        localStorage.setItem("token", token);
        resolve(resp);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        reject(err);
      });
  });
