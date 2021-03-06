const axios = require("axios").default;
const URL_BASE = "http://kis-project.std-933.ist.mospolytech.ru";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

const token = localStorage.getItem("token");
const headers = {
  Authorization: token,
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

export const registerUser = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}/register`, user, headers);
    axios
      .post(`${URL_BASE}/register`, user, headers)
      .then(function (resp) {
        localStorage.setItem("token", token);
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
export const addClient = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}/api/v1/clients/create`, user, headers);
    axios
      .post(`${URL_BASE}/api/v1/clients/create`, user, headers)
      .then(function (resp) {
        resolve(resp);
      })
      .catch(function (err) {
      
        reject(err);
      });
  });