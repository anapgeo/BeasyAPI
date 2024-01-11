// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { usersGET, usersUserIdGET } = require('../service/DefaultService.js');
const app = require('../index.js');

// Setup before and after hooks
test.before(async (t) => {
    // Create an HTTP server using the express app
    t.context.server = http.createServer(app);

    // Start listening on a random port and get the URL
    t.context.prefixUrl = await listen(t.context.server);

    // Create a 'got' instance with the server's URL as the prefix
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

// Close the server after all tests are done
test.after.always((t) => {
    t.context.server.close();
});

// Group of tests related to users
test('GET Users', async (t) => {
    // Make a GET request to retrieve users
    const { body, statusCode } = await t.context.got("users");

    // Assertions
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one user');
    t.is(body[0].name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: GET Users by function
test('GET Users by function', async (t) => {
    // Call the function to get users
    const result = await usersGET();

    // Assertions
    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one user');
    t.is(result[0].name, 'name', 'First user should have the expected name');
});

// Test: Get User Details
test('Get User Details', async (t) => {
    const userId = 0;

    // Make a GET request to retrieve details of a user
    const { body, statusCode } = await t.context.got(`users/${userId}`);

    // Assertions
    t.truthy(body, 'Response should have a body property');
    t.is(body.name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Get User Details by function
test('Get User Details by function', async (t) => {
    const userId = 0;

    // Call the function to get details of a user
    const result = await usersUserIdGET(userId);

    // Assertions
    t.truthy(result, 'Response should have a body property');
    t.is(result.name, 'name', 'First user should have the expected name');
});

// Test: Get User Details - Bad Case
test('Get User Details-BadCase', async (t) => {
    const userId = "ifspoefjs";

    // Make a GET request to retrieve details of a user with error handling
    const { body, statusCode } = await t.context.got(`users/${userId}`, {
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test: Update User Details
test('Update User Details', async (t) => {
    const userId = 0;

    const updatedUserData = {
        "name": "coolerName",
        "email": "coolerPapakiString"
    };

    // Make a PUT request to update details of a user
    const { body, statusCode } = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
    });

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Update User Details - Bad Case
test('Update User Details-BadCase', async (t) => {
    const userId = 0;

    const updatedUserData = {
        "name": 236754,
        "email": "coolerPapakiString"
    };

    // Make a PUT request to update details of a user with error handling
    const { body, statusCode } = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test: Delete a User
test('Delete a User', async (t) => {
    const userId = 0;

    // Make a DELETE request to delete a user
    const { body, statusCode } = await t.context.got.delete(`users/${userId}`);

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Create a User
test('Create a User', async (t) => {
    const newUserData = {
        "name": "something",
        "id": 17,
        "email": "eimail"
    };

    // Make a POST request to create a new user
    const { body, statusCode } = await t.context.got.post(`users`, {
        json: newUserData,
    });

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Create a User - Bad Case
test('Create a User-BadCase', async (t) => {
    const newUserData = {
        "name": 476,
        "id": "fg",
        "email": "eimail"
    };

    // Make a POST request to create a new user with error handling
    const { body, statusCode } = await t.context.got.post(`users`, {
        json: newUserData,
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});
