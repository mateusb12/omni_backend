const admin = require("firebase-admin");
const serviceAccount = require("./firebase_sdk.json");
const {generateRandomOrder} = require("./databaseStructure/randomGenerator");
const {printPremise, checkForDuplicateMessage, checkForDuplicateSnapshot} = require("./firebaseUtils");

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

class FirebaseDatabase{
    constructor(inputDatabase = null){
        if (inputDatabase) {
            this.db = inputDatabase;
        } else {
            this.db = instantiateFirebase();
        }
        this.path = "core_messages"
        console.log("Database instantiated!")
    }

    createFirebaseEntry(message= {"message": "Hello World!", "sender": "Alice"}){
        let path = this.path;
        const ref = this.db.ref(path);
        return ref.once("value")
            .then(snapshot => {
                const isDuplicate = checkForDuplicateSnapshot(snapshot, message)
                console.log("Is duplicate: " + isDuplicate);
                if (!isDuplicate) {
                    return ref.push(message)
                        .then(() => {
                            return { statusCode: 200, body: "Entry successfully added!" };
                        })
                        .catch(error => {
                            console.error(error);
                            return { statusCode: 500, body: "Error adding entry" };
                        });
                } else {
                    return { statusCode: 400, body: "Duplicate entry found" };
                }
            })
            .catch(error => {
                console.error(error);
                return { statusCode: 500, body: "Error retrieving branch data" };
            });
    }

    readFirebaseEntry(){
        let database = this.db;
        let messageRef = database.ref(this.path);
        return createPremise(messageRef);
    }

    readAllFirebaseEntries(){
        let database = this.db;
        let messageRef = database.ref();
        return messageRef.once("value")
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(error => {
                console.error(error);
                return { statusCode: 500, body: "Error retrieving branch data" };
            });
    }

    updateFirebaseEntry(uniqueId, newData){
        let ref = this.db.ref(this.path)
        let childRef = ref.child(uniqueId);
        childRef.update(newData);
        return { statusCode: 200, body: "Entry successfully updated!" };
    }

    deleteFirebaseEntry(uniqueId){
        let ref = this.db.ref(this.path).child(uniqueId);
        ref.remove();
        return { statusCode: 200, body: "Entry successfully deleted!" };
    }
}

if (require.main === module) {
    // This script is being run directly
    let db = new FirebaseDatabase();
    const randomOrder = generateRandomOrder();
    // const dummyEntry = {"a": "b", "c": "d"};
    let createResponse = db.createFirebaseEntry(randomOrder);
    // read all entries using asynchronous way
    // let readResponse = db.readAllFirebaseEntries();
    printPremise(createResponse);
    // db.updateFirebaseEntry("-NQ6Asktmpaa7QEKSDPl", {"message": "New message!", "sender": "Bob"});
    // printPremise(createResponse)
    // db.deleteFirebaseEntry("-NQWS87Jss1FH9j_weYy")
    console.log("Done!")
}

module.exports = { FirebaseDatabase };