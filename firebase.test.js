const { FirebaseDatabase } = require('./index.js');
let db = new FirebaseDatabase();
db.path = "test_messages"


test('CRUD test', async () => {
    let inputData = {"message": "Hello World!", "sender": "Alice"}
    // write message to database
    await db.createFirebaseEntry(inputData);
    const readResult = await db.readFirebaseEntry();
    let uniqueId = Object.keys(readResult)[0]
    let output = Object.values(readResult)[0]
    expect(output).toEqual(expect.objectContaining(
        inputData
    ));
    let newData = {"message": "New message!", "sender": "Bob"}
    let updateResult = db.updateFirebaseEntry(uniqueId, newData);
    expect(updateResult).statusCode.toBe(true);
    // let deleteResult = db.deleteFirebaseEntry(uniqueId);
    // expect(deleteResult).statusCode.toBe(true);
});


test('retrieveMessageFromDatabase should return a premise with the correct data', async () => {
    let expectedData = {"message": "Hello World!", "sender": "Alice"}
    const firebaseResult = await db.readFirebaseEntry();
    let output = Object.values(firebaseResult)[0]
    expect(output).toEqual(expect.objectContaining(
        expectedData
    ));
});


// test('updateMessageInDatabase should update the message in the database', async () => {
//     let inputData = {"message": "Hello World!", "sender": "Alice"}
//     let newData = {"message": "New message!", "sender": "Bob"}
//
//     // write message to database
//     await db.createFirebaseEntry(inputData);
//
//     // update message in database
//     await db.updateFirebaseEntry(newData);
//
//     const firebaseResult = await db.readFirebaseEntry();
//     let output = Object.values(firebaseResult)[0]
//     expect(output).toEqual(expect.objectContaining(
//         newData
//     ));
// }