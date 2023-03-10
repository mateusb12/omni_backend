// const test = require('firebase-functions-test')({
//     databaseURL: 'https://omnichat-9a789-default-rtdb.firebaseio.com/',
//     projectId: 'omnichat-9a789',
// }, 'firebase_sdk.json');
//
const { Database } = require('./index.js');
//
// let db1 = test.database;
let db2 = new Database();
// let isSameType = db1.constructor === db2.constructor;
// const admin = require('firebase-admin');
// const jest = require("jest");
console.log("Done!")

import { MockFirebaseDatabase } from 'ts-mock-firebase';
const mockDB = new MockFirebaseDatabase({
    users: {
        alice: {name: 'Alice', age: 25},
        bob: {name: 'Bob', age: 30}
    }
});

// mockdatabase.child('users').set({
//     alice: {
//         name: 'Alice',
//         age: 25
//     },
//     bob: {
//         name: 'Bob',
//         age: 30
//     }
// });
//
// function getDataFromDatabase() {
//     return new Promise((resolve, reject) => {
//         mockdatabase.child('users').child('alice').once('value', function(snapshot) {
//             console.log("Promise resolved")
//             resolve(snapshot.val());
//         }, function(error) {
//             console.log("Promise rejected")
//             reject(error);
//         });
//     });
// }
// console.log("Start!")
// getDataFromDatabase().then(function(data) {
//     console.log(data);
// }).catch(function(error) {
//     console.log(error);
// });

// getDataFromDatabase().then(data => {
//     console.log(data); // {name: 'Alice', age: 25}
// }).catch(error => {
//     console.log(error);
// });

//
// // Mock the instantiateFirebase function to return the mocked database instance
// const instantiateFirebase = jest.fn(() => mockedDatabase);
//
// // Test the mocked function
// test('should return a mocked database instance', () => {
//     const database = instantiateFirebase();
//     expect(database).toBe(mockedDatabase);
//     expect(database.ref).toHaveBeenCalled();
// });