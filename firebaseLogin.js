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

    getUserByUniqueId(uniqueId){
        return this.firebaseInstance.readFirebaseEntry(uniqueId);
    }

    getUserByEmail(userEmail){
        let allUsersPromise = this.getAllUsers();
        return allUsersPromise.then(allUsersObject => {
            let userJson = null;
            for (let userId in allUsersObject){
                if (allUsersObject[userId].email === userEmail){
                    userJson = allUsersObject[userId];
                    break;
                }
            }
            return userJson;
        });
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

    getAllUsersUniqueIds(){
        let allUsersPromise = this.getAllUsers();
        return allUsersPromise.then(allUsersObject => {
            let allUsersUniqueIds = [];
            for (let userId in allUsersObject){
                allUsersUniqueIds.push(userId);
            }
            return allUsersUniqueIds;
        });
    }

    updateUser(uniqueId, newUserData){
        return this.firebaseInstance.updateFirebaseEntry(uniqueId, newUserData);
    }

    deleteUser(uniqueId){
        return this.firebaseInstance.deleteFirebaseEntry(uniqueId);
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

function testDeleteUser(inputFirebaseLogin){
    let userUniqueId = "-NRdzqtCeYQZTa0wJ9Wp"
    let deleteResponse = inputFirebaseLogin.deleteUser(userUniqueId);
}

function testGetUserByEmail(inputFirebaseLogin){
    let dummyUserEmail = "mail@example.com"
    let userJson = inputFirebaseLogin.getUserByEmail(dummyUserEmail);
    printPremise(userJson);
}

function testGetAllUsersUniqueIds(inputFirebaseLogin){
    let allUsersUniqueIds = inputFirebaseLogin.getAllUsersUniqueIds();
    printPremise(allUsersUniqueIds);
}


if (require.main === module) {
    let instance = new FirebaseDatabase();
    let fl = new FirebaseLogin(instance);
    testGetAllUsersUniqueIds(fl);
}