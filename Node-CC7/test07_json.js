const fs = require('fs')
let jsonObj, users;

jsonObj = JSON.parse(fs.readFileSync('./sample.json'))
users = jsonObj.users
console.log(users[0].phoneNumber.toString().repeat(12))
