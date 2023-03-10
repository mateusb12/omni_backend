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

class FirebaseWrapper{
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

    deleteFirebaseEntry(uniqueId){
        let ref = this.db.ref(this.path).child(uniqueId);
        ref.remove();
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
    let fb = new FirebaseWrapper();
    // db.createFirebaseEntry()
    // fb.updateFirebaseEntry("-NQ6uKDsaC-G1ufX3Mq6", {"message": "New message!", "sender": "Bob"});
    fb.deleteFirebaseEntry("-NQ6uKDsaC-G1ufX3Mq6")
}

module.exports = {Database: FirebaseWrapper, waterBase: waterBase};