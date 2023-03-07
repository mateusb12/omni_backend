// Import the Database class
const Database = require('./index.js');

// Create a new instance of the Database class
const db = new Database();

// Write a test case for the retrieveMessageFromDatabase function
test('retrieveMessageFromDatabase should return a premise from the specified path', async () => {
    // Mock the database.ref and database.ref.once functions
    db.db.ref = jest.fn().mockReturnThis();
    db.db.ref.once = jest.fn().mockResolvedValue('Hello World');

    // Call the retrieveMessageFromDatabase function with a path
    const premise = await db.retrieveMessageFromDatabase('dummy_messages');

    // Expect that the database.ref function was called with the path
    expect(db.db.ref).toHaveBeenCalledWith('dummy_messages');

    // Expect that the database.ref.once function was called with 'value'
    expect(db.db.ref.once).toHaveBeenCalledWith('value');

    // Expect that the premise is 'Hello World'
    expect(premise).toBe('Hello World');
});