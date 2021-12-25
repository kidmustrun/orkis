const token = localStorage.getItem("token");
const URL_BASE = "http://kis-project.std-933.ist.mospolytech.ru/";
export const putSomething = (dataName, data) =>
  new Promise((resolve, reject) => {
    var axios = require("axios");

    var config = {
      method: "put",
      url: `${URL_BASE}${dataName}`,
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