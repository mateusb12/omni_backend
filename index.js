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
    constructor(){
        this.db = instantiateFirebase();
        console.log("Database instantiated!")
    }

    writeMessageToDatabase(message="Hello World", path="dummy_messages"){
        this.db.ref(path).push(message);
    }

    retrieveMessageFromDatabase(path="dummy_messages"){
        // Get a reference to the database service
        let database = this.db;
        // Get a reference to the specified path
        let messageRef = database.ref(path);
        return createPremise(messageRef);
    }

    printPremise(inputPremise){
        inputPremise.then(function(message) {
            // Print the message
            console.log(message);
        });
    }
}

if (require.main === module) {
    // This script is being run directly
    let db = new Database();
    let dummy_msg = "hello world"
    let aux = {"sender": "Alice"}
    let retrieved_msg = db.retrieveMessageFromDatabase("dummy_messages");
    db.printPremise(retrieved_msg);
}

module.exports = Database;