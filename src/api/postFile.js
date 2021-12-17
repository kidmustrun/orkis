const token = localStorage.getItem("token");
const URL_BASE = "http://kis-project.std-941.ist.mospolytech.ru/";
export const postFile = (dataName, data) =>
  new Promise((resolve,reject) => {
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
    .then(function(resp){
        resolve(resp);
        location.reload()
      })
      .catch(function(error){
        reject(error);
      });
  });