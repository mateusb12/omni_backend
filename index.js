const admin = require("firebase-admin");
const serviceAccount = require("./firebase_sdk.json");

function instantiateFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://omnichat-9a789-default-rtdb.firebaseio.com/"
    });
    return admin.database();
}

function createPremise(messageRef) {
    return new Promise((resolve, reject) => {
        // Use the on() method with two arguments
        messageRef.on('value', function (snapshot) {
            // Get the value of the data at the path
            let message = snapshot.val();
            // Resolve the promise with the message
            resolve(message);
            // Detach the event listener
            messageRef.off('value');
        }, function (error) {
            // Reject the promise with the error
            reject(error);
        });
    });
}

class Database{
    constructor(inputDatabase = null){
        if (inputDatabase) {
            this.db = inputDatabase;
        } else {
            this.db = instantiateFirebase();
        }
        this.path = "dummy_messages"
        console.log("Database instantiated!")
    }

    createFirebaseEntry(message= {"message": "Hello World!", "sender": "Alice"}){
        this.db.ref(this.path).push(message);
    }

    readFirebaseEntry(){
        let database = this.db;
        let messageRef = database.ref(this.path);
        return createPremise(messageRef);
    }

    updateFirebaseEntry(uniqueId, newData){
        let ref = this.db.ref(this.path).child(uniqueId);
        ref.update(newData);
    }

    printPremise(inputPremise){
        inputPremise.then(function(message) {
            console.log(message);
        });
    }
}

function waterBase(firebaseInstance, message= {"message": "Hello World!", "sender": "Alice"}){
    firebaseInstance.ref(this.path).push(message);
}

if (require.main === module) {
    // This script is being run directly
    let db = new Database();
    // db.createFirebaseEntry()
    db.updateFirebaseEntry("-NQ6Asktmpaa7QEKSDPl", {"message": "New message!", "sender": "Bob"});
}

module.exports = Database;