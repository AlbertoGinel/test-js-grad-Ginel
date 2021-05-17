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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */


const fetch = require('node-fetch');

//adding to the structure all the couples user-pack

function addCouple(packname,username,structure){

  let usernameIndex = structure.findIndex(elem => elem.username === username);
  if(usernameIndex == -1){
    //new username
    usernameIndex = structure.push({"username":username,"packageNames":[]}) - 1
  }

  let packageNameIndex = structure[usernameIndex].packageNames.indexOf(packname);
  if(packageNameIndex == -1){
    //new packname
    structure[usernameIndex].packageNames.push(packname)
  }
}

module.exports = async function organiseMaintainers() {
  
  let body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
  };

  const maintainers = await fetch('http://ambush-api.inyourarea.co.uk/ambush/intercept', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {

    let finalArray = [];

    data.content.forEach(elemPackage => {
      elemPackage.package.maintainers.forEach(user => {
        addCouple(elemPackage.package.name,user.username,finalArray);
      });
    });

    //sort username

    finalArray.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0))

    //sort  packageNames

    finalArray.forEach(element => {
      element.packageNames.sort();
    });

  
    return finalArray
    

  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  return maintainers
};

