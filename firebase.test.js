const Database = require('./index.js');
const db = new Database();



// Write a test case for the retrieveMessageFromDatabase function
test('retrieveMessageFromDatabase should return a premise with the correct data', async () => {
    let expectedData = {"message": "Hello World!", "sender": "Alice"}

    const firebaseResult = await db.retrieveMessageFromDatabase('dummy_messages');
    let output = Object.values(firebaseResult)[0]
    expect(output).toEqual(expect.objectContaining(
        expectedData
    ));
});