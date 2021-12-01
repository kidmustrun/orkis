const axios = require("axios").default;
const URL_BASE = "http://kis-project.std-941.ist.mospolytech.ru";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const registerUser = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}/register`, user, requestHeaders);
    axios
      .post(`${URL_BASE}/register`, user, requestHeaders)
      .then(function (resp) {
        resolve(resp);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        reject(err);
      });
  });
export const loginUser = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}/login`, user, requestHeaders);
    axios
      .post(`${URL_BASE}/login`, user, requestHeaders)
      .then(function (resp) {
        const token = resp.data[1]
        localStorage.setItem("token", token);
        resolve(resp);
      })
      .catch(function (err) {
        localStorage.removeItem("token");
        reject(err);
      });
  });
export const logoutUser = () => {
  localStorage.removeItem("token");
};
