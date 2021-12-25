const token = localStorage.getItem("token");
const URL_BASE = "http://kis-project.std-941.ist.mospolytech.ru/";
export const postSomething = (dataName, data) =>
  new Promise((resolve, reject) => {
    var axios = require("axios");

    var config = {
      method: "post",
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
        console.log(data)
        resolve(response);
      })
      .catch(function (error) {
        console.log(data)
        reject(error);
      });
  });