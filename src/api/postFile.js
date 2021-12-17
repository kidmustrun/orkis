const token = localStorage.getItem("token");
const URL_BASE = "http://kis-project.std-941.ist.mospolytech.ru/";
export const postFile = (dataName, data) =>
  new Promise(() => {
    var axios = require("axios");
    var config = {
      method: "post",
      url: `${URL_BASE}${dataName}`,
      data: data,
      headers: {
        Authorization: token,
        Accept: "*/*",
        'Content-Type': 'multipart/form-data',
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    axios(config)
    .then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
  });