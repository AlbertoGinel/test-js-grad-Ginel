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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */


const fetch = require('node-fetch');

module.exports = async function countMajorVersionsAbove10() {
  

  let body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  };

  const count = await fetch('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    method: 'POST',
    body: JSON.stringify(body) //body
  })
  .then(response => response.json())
  .then(data => {
    
    const versions = data.content.filter((elem)=>{

      const versionCodes = elem.package.version.split('.');

      if( parseInt(versionCodes[0]) > 10){
        return versionCodes[0];
      }else{
        return false;
      }
    });

    return versions.length;

  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  return count
};
