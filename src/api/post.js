const token = localStorage.getItem("token");
const URL_BASE = "http://kis-project.std-941.ist.mospolytech.ru/";
const axios = require("axios").default;
const headers = {
  Authorization: token,
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

export const addClient = (user) =>
  new Promise((resolve, reject) => {
    console.log(`${URL_BASE}api/v1/clients/create`, user, headers);
    axios
      .post(`${URL_BASE}api/v1/clients/create`, user, headers)
      .then(function (resp) {
        resolve(resp);
      })
      .catch(function (err) {
      
        reject(err);
      });
  });

export const postSomething = (dataName, data) =>
  new Promise((resolve, reject) => {
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${URL_BASE}/${dataName}`,
      data: data,
      headers: {
        Authorization: token,
        Accept: "*/*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    

    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
  
