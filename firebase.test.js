const { Database } = require('./index.js');
const db = new Database();


test('writeMessageToDatabase should write the message to the database', async () => {
    let inputData = {"message": "Hello World!", "sender": "Alice"}
    // write message to database
    await db.createFirebaseEntry(inputData);
    const firebaseResult = await db.readFirebaseEntry();
    let output = Object.values(firebaseResult)[0]
    expect(output).toEqual(expect.objectContaining(
        inputData
    ));
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