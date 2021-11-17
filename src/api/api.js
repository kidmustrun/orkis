const axios = require("axios").default;
const URL_BASE = "http://7837-95-165-9-250.ngrok.io";
const requestHeaders = {
  "Access-Control-Allow-Origin": "*",
  'Accept': "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const loginUser = user => { console.log(user);
    axios
    .post(
      `${URL_BASE}/login`,
      {
        user
      },
      requestHeaders
    )
    .then((response) => {
      localStorage.setItem('token', response.headers.authorization);
      console.log(localStorage.getItem('token'))
    })
    .catch(function (error) {
      localStorage.removeItem('token');
      console.error("Something bad happened", error);
    });
}