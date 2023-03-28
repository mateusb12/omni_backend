const { FirebaseDatabase } = require('./index.js');
const {printPremise} = require("./firebaseUtils");

class FirebaseLogin{
    constructor(inputFirebaseInstance){
        this.firebaseInstance = inputFirebaseInstance;
        this.firebaseInstance.path = "users"
    }

    createUser(email, password){
        let userJson = {
            "email": email,
            "password": password
        }
        return this.firebaseInstance.createFirebaseEntry(userJson);
    }

    getAllUsers(){
        return this.firebaseInstance.readFirebaseEntry();
    }

    getUserUniqueId(userJson){
        let allUsersPromise = this.getAllUsers();
        return allUsersPromise.then(allUsersObject => {
            let userUniqueId = null;
            for (let userId in allUsersObject){
                if (allUsersObject[userId].email === userJson.email && allUsersObject[userId].password === userJson.password){
                    userUniqueId = userId;
                    break;
                }
            }
            return userUniqueId;
        });
    }

    getUserUniqueIdByEmail(userEmail){
        let allUsersPromise = this.getAllUsers();
        return allUsersPromise.then(allUsersObject => {
            let userUniqueId = null;
            for (let userId in allUsersObject){
                if (allUsersObject[userId].email === userEmail){
                    userUniqueId = userId;
                    break;
                }
            }
            return userUniqueId;
        });
    }

    updateUser(uniqueId, newUserJson){
        return this.firebaseInstance.updateFirebaseEntry(uniqueId, newUserJson);
    }
}

function testCreateUser(inputFirebaseLogin){
    let dummyEmail = "mail@example.com"
    let dummyPassword = "password"
    let createResponse = inputFirebaseLogin.createUser(dummyEmail, dummyPassword);
    printPremise(createResponse);
}

function testReadAllUsers(inputFirebaseLogin){
    let readResponse = inputFirebaseLogin.getAllUsers();
    printPremise(readResponse);
}

function testGetUserUniqueId(inputFirebaseLogin){
    let dummyUserJson = {
        "email": "mail@example.com",
        "password": "password"
    }
    let userUniqueId = inputFirebaseLogin.getUserUniqueId(dummyUserJson);
    printPremise(userUniqueId);
}

function testGetUserUniqueIdByEmail(inputFirebaseLogin){
    let dummyUserEmail = "mail@example.com"
    let userUniqueId = inputFirebaseLogin.getUserUniqueIdByEmail(dummyUserEmail);
    printPremise(userUniqueId);
}

function testUpdateUser(inputFirebaseLogin){
    let userUniqueId = "-NRdzqtCeYQZTa0wJ9Wp"
    let updatedUserJson = {
        "email": "mail@example2.com",
        "password": "password2"
    }
    let updateResponse = inputFirebaseLogin.updateUser(userUniqueId, updatedUserJson);
    // printPremise(updateResponse);
}


if (require.main === module) {
    let instance = new FirebaseDatabase();
    let fl = new FirebaseLogin(instance);
    testUpdateUser(fl);
}