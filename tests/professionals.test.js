// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { professionalsGET, professionalsProfessionalIDGET } = require('../service/DefaultService.js');
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

// Group of tests related to professionals
test('GET Professionals', async (t) => {
    // Make a GET request to retrieve professionals
    const { body, statusCode } = await t.context.got("professionals");

    // Assertions
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one professional');
    t.is(body[0].profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: GET Professionals by function
test('GET Professionals by function', async (t) => {
    // Call the function to get professionals
    const result = await professionalsGET();

    // Assertions
    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one professional');
    t.is(result[0].profession, 'profession', 'First professional should have the expected profession value');
});

// Test: GET Professionals Details
test('GET Professionals Details', async (t) => {
    const professionalId = 0;

    // Make a GET request to retrieve details of a professional
    const { body, statusCode } = await t.context.got(`professionals/${professionalId}`);

    // Assertions
    t.truthy(body, 'Response should have a body property');
    t.is(body.profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: GET Professionals Details by function
test('GET Professionals Details by function', async (t) => {
    const professionalId = 0;

    // Call the function to get details of a professional
    const result = await professionalsProfessionalIDGET(professionalId);

    // Assertions
    t.truthy(result, 'Response should have a body property');
    t.is(result.profession, 'profession', 'First professional should have the expected profession value');
});

// Test: GET Professionals Details - Bad Case
test('GET Professionals Details-BadCase', async (t) => {
    const professionalId = "otaksi";

    // Make a GET request to retrieve details of a professional with error handling
    const { body, statusCode } = await t.context.got(`professionals/${professionalId}`, {
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test: Update Professional Details
test('Update Professional Details', async (t) => {
    const professionalId = 0;

    const updatedProfessionalData = {
        "name": "coolName",
        "email": "coolPapakiString"
    };

    // Make a PUT request to update details of a professional
    const { body, statusCode } = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
    });

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Update Professional Details - Bad Case
test('Update Professional Details-BadCase', async (t) => {
    const professionalId = "om[pamios";

    const updatedProfessionalData = {
        "name": 1234,
        "email": "coolPapakiString"
    };

    // Make a PUT request to update details of a professional with error handling
    const { body, statusCode } = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Similar tests for deleting and creating professionals...

// Test: Delete a Professional
test('Delete a Professional', async (t) => {
    const professionalId = 0;

    // Make a DELETE request to delete a professional
    const { body, statusCode } = await t.context.got.delete(`professionals/${professionalId}`);

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Create a Professional
test('Create a Professional', async (t) => {
    const newProfessionalData = {
        "profession": "Mastoras",
        "name": "Bob",
        "id": 24,
        "services": [
            { "availableservice": "tsimentoma" },
            { "availableservice": "plakakia" }
        ]
    };

    // Make a POST request to create a new professional
    const { body, statusCode } = await t.context.got.post(`professionals`, {
        json: newProfessionalData,
    });

    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Create a Professional - Bad Case
test('Create a Professional-BadCase', async (t) => {
    const newProfessionalData = {
        "profession": 47,
        "name": 90,
        "id": "deskero",
        "services": [
            { "availableservice": 6 },
            { "availableservice": "plakakia" }
        ]
    };

    // Make a POST request to create a new professional with error handling
    const { body, statusCode } = await t.context.got.post(`professionals`, {
        json: newProfessionalData,
        throwHttpErrors: false,
    });

    // Assertions
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});
