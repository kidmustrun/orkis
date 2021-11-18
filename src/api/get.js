const token = localStorage.getItem('token');
export const getSomething = (dataName) =>
  new Promise((resolve, reject) => {
    var axios = require('axios');

var config = {
  method: 'get',
  url: `http://b740-95-165-9-250.ngrok.io/api/v1/${dataName}`,
  headers: { 
            "Authorization": token
  },
};

axios(config)
.then(function (response) {
  resolve(response)
})
.catch(function (error) {
  console.log(error);
  reject(error)
});
  });