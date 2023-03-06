const admin = require("firebase-admin");
const serviceAccount = require("./firebase_sdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://omnichat-9a789-default-rtdb.firebaseio.com/"
});

const database = admin.database();

database.ref("messages").set("Hello, world!");

database.ref("messages").once("value", (snapshot) => {
    const message = snapshot.val();
    console.log(message);
});