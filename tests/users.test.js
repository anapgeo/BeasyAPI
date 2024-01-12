// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { usersGET, usersUserIdGET } = require('../service/DefaultService.js');
const app = require('../index.js');

// Setup before and after hooks
test.before(async (t) => {

    // Create an HTTP server instance for testing
    t.context.server = http.createServer(app);

    // Set up a prefix URL for making requests to the server
    t.context.prefixUrl = await listen(t.context.server);

    // Extend the 'got' HTTP client with the prefix URL and set the response type to JSON
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

// Close the server after all tests are executed

test.after.always((t) => {
    t.context.server.close();
});

// Group of tests related to users

// Test to get all users
test('GET Users', async (t) => {

    const { body, statusCode }  = await t.context.got("users");

    // Assertions for the response

    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one user');
    t.is(body[0].name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to get all users using a function
test('GET Users by function', async (t) => {
    const result  = await usersGET();

    // Assertions for the result

    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one user');
    t.is(result[0].name, 'name', 'First user should have the expected name');
});


// Test to get details of a specific user
test('Get User Details', async (t) => {
    const userId = 0; 
    const { body, statusCode }  = await t.context.got(`users/${userId}`);

    // Assertions for the response

    t.truthy(body, 'Response should have a body property');
    t.is(body.name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to get details of a specific user using a function
test('Get User Details by function', async (t) => {
    const userId = 0; 
    const result  = await usersUserIdGET(userId);

    // Assertions for the result

    t.truthy(result, 'Response should have a body property');
    t.is(result.name, 'name', 'First user should have the expected name');
});

// Test to get details of a specific user with an invalid user ID (Bad Case)
test('Get User Details-BadCase', async (t) => {
    const userId = "ifspoefjs"; 
    const { body, statusCode }  = await t.context.got(`users/${userId}`,{
        throwHttpErrors: false,
    });

    // Assertion for the status code in a bad case
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test to update details of a specific user

test('Update User Details', async (t) => {
    const userId = 0;

    const updatedUserData = {
        "name": "coolerName",
        "email": "coolerPapakiString"
    };

    const { body, statusCode }  = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
    });

    // Assertion for the status code in a successful update
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to update details of a specific user with invalid data (Bad Case)

test('Update User Details-BadCase', async (t) => {
    const userId = 0;

    const updatedUserData = {
        "name": 236754,
        "email": "coolerPapakiString"
    };

    const { body, statusCode }  = await t.context.got.put(`users/${userId}`, {

        json: updatedUserData,
        throwHttpErrors: false,
    });


    // Assertion for the status code in a bad case
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test to delete a specific user
test('Delete a User', async (t) => {
    const userId = 0;
    const { body, statusCode }  = await t.context.got.delete(`users/${userId}`);

    // Assertion for the status code in a successful deletion
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to create a new user

test('Create a User', async (t) => {
    const newUserData = {
        "name": "something",
        "id": 17,
        "email": "eimail"
    };

    const { body, statusCode }  = await t.context.got.post(`users`, {
        json: newUserData,
    });

    // Assertion for the status code in a successful creation
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to create a new user with invalid data (Bad Case)

test('Create a User-BadCase', async (t) => {
    const newUserData = {
        "name": 476,
        "id": "fg",
        "email": "eimail"
    };

    const { body, statusCode }  = await t.context.got.post(`users`, {

        json: newUserData,
        throwHttpErrors: false,
    });


    // Assertion for the status code in a bad case

    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});
