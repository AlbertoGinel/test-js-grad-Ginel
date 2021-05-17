/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */



const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
  

  let body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  };

  const name = await fetch('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    method: 'POST',
    body: JSON.stringify(body) //body
  })
  .then(response => response.json())
  .then(data => {

    let olderStamp = Date.now();
    let olderName = "failed";

    data.content.forEach(element => {

      let timeStamp = Date.parse(element.package.date);

      if(timeStamp < olderStamp){
        olderStamp = timeStamp;
        olderName = element.package.name;
      }
    });
    
    return olderName

  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  return name
};
