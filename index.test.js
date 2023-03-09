const test = require('firebase-functions-test')({
    databaseURL: 'https://omnichat-9a789-default-rtdb.firebaseio.com/',
    projectId: 'omnichat-9a789',
}, 'firebase_sdk.json');

const myFunctions = require('./index.js');
const wrapped = test.wrap(myFunctions.waterBase);
const data = "a";


console.log("Done!")