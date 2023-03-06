const admin = require("firebase-admin");
const serviceAccount = require("./firebase_sdk.json");

function instantiateFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://omnichat-9a789-default-rtdb.firebaseio.com/"
    });

    return admin.database();
}

class Database{
    constructor(){
        this.database = instantiateFirebase();
    }

    writeMessageToDatabase(message){
        this.database.ref("messages").push(message);
    }

    retrieveMessageFromDatabase(message){
        this.database.ref("messages").once("value", (snapshot) => {
            const message = snapshot.val();
            console.log(message);
        });
    }
}

if (require.main === module) {
    // This script is being run directly
    let db = new Database();
    db.retrieveMessageFromDatabase();
}