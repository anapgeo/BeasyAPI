// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { professionalsGET, professionalsProfessionalIDGET } = require('../service/DefaultService.js');
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

// Group of tests related to professionals

// Test to get all professionals
test('GET Professionals', async (t) => {

    const { body, statusCode }  = await t.context.got("professionals");

    // Assertions for the response

    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one professional');
    t.is(body[0].profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


// Test to get all professionals using a function
test('GET Professionals by function', async (t) => {
    const result  = await professionalsGET();

    // Assertions for the result

    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one professional');
    t.is(result[0].profession, 'profession', 'First professional should have the expected profession value');
});


// Test to get details of a specific professional
test('GET Professionals Details', async (t) => {
    const professionalId = 0; 
    const { body, statusCode }  = await t.context.got(`professionals/${professionalId}`);

    // Assertions for the response

    t.truthy(body, 'Response should have a body property');
    t.is(body.profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


// Test to get details of a specific professional using a function
test('GET Professionals Details by function', async (t) => {
    const professionalId = 0; 
    const result  = await professionalsProfessionalIDGET(professionalId);

    // Assertions for the result

    t.truthy(result, 'Response should have a body property');
    t.is(result.profession, 'profession', 'First professional should have the expected profession value');
});

// Test to get details of a specific professional with an invalid professional ID (Bad Case)
test('GET Professionals Details-BadCase', async (t) => {
    const professionalId = "otaksi"; 
    const { body, statusCode }  = await t.context.got(`professionals/${professionalId}`,{
        throwHttpErrors: false,
    });

    // Assertion for the status code in a bad case
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test to update details of a specific professional

test('Update Professional Details', async (t) => {
    const professionalId = 0;

    const updatedProfessionalData = {
        "name": "coolName",
        "email": "coolPapakiString"
    };

    const { body, statusCode }  = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
    });

    // Assertion for the status code in a successful update
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to update details of a specific professional with invalid data (Bad Case)

test('Update Professional Details-BadCase', async (t) => {
    const professionalId = "om[pamios";

    const updatedProfessionalData = {
        "name": 1234,
        "email": "coolPapakiString"
    };

    const { body, statusCode }  = await t.context.got.put(`professionals/${professionalId}`, {

        json: updatedProfessionalData,
        throwHttpErrors: false,
    });


    // Assertion for the status code in a bad case
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test to delete a specific professional
test('Delete a Professional', async (t) => {
    const professionalId = 0; 
    const { body, statusCode }  = await t.context.got.delete(`professionals/${professionalId}`);

    // Assertion for the status code in a successful deletion
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to create a new professional

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


    const { body, statusCode }  = await t.context.got.post(`professionals`, {
        json: newProfessionalData,
    });

    // Assertion for the status code in a successful creation
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to create a new professional with invalid data (Bad Case)

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

    const { body, statusCode }  = await t.context.got.post(`professionals`, {

        json: newProfessionalData,
        throwHttpErrors: false,
    });


    // Assertion for the status code in a bad case

    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});
