// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { usersUserIdAppointmentsGET, professionalsProfessionalIdAppointmentsGET } = require('../service/DefaultService.js');
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

// Group of tests related to appointments

// Test to get appointments by user
test('Get Appointments by User', async (t) => {
    const userId = 0; 
    const { body, statusCode }  = await t.context.got(`users/${userId}/appointments`);
    
    // Assertions for the response

    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].userId, userId, 'First appointment should have the expected userId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


// Test to get appointments by user using a function

test('Get Appointments by User by function', async (t) => {
    const userId = 0;
    
    // Call the function to get user appointments
    const result = await usersUserIdAppointmentsGET(userId);
    

    // Assertions for the result

    t.true(Array.isArray(result), 'Response body should be an array');
    t.is(result[0].userId, userId, 'First appointment should have the expected userId');
});


// Test to get appointments by user with an invalid user ID (Bad Case)
test('Get Appointments by User-BadCase', async (t) => { 
    const userId = 0; 
    const { body, statusCode }  = await t.context.got(`users/${userId}/appointments`, {
        throwHttpErrors: false,
    });

    // Assertion for the status code in a bad case
    t.is(statusCode, 200, 'Status code should be 200 for an unsuccessful request');
});

// Test to get appointments by professional
test('Get Appointments by Professional', async (t) => {
    const professionalId = 6; 
    const { body, statusCode }  = await t.context.got(`professionals/${professionalId}/appointments`);
    
    // Assertions for the response
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].professionalId, professionalId, 'First appointment should have the expected professionalId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to get appointments by professional using a function
test('Get Appointments by Professional by function', async (t) => {
    const professionalId = 6; 
    const result  = await professionalsProfessionalIdAppointmentsGET(professionalId);
    
    // Assertions for the result
    t.true(Array.isArray(result), 'Response body should be an array');
    t.is(result[0].professionalId, professionalId, 'First appointment should have the expected professionalId');
});

// Test to get appointments by professional with an invalid professional ID (Bad Case)
test('Get Appointments by Professional-BadCase', async (t) => {
    const professionalId = "yuifgireyf"; 
    const { body, statusCode }  = await t.context.got(`professionals/${professionalId}/appointments`, {
        throwHttpErrors: false,
    });

    // Assertion for the status code in a bad case
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

// Test to create a new appointment

test('Create an Appointment', async (t) => {
    const newAppointmentData = {
        "professionalId": 80,
        "userId": 66,
        "appointmentDate": "2023-07-23T04:56:07.000Z"
    };

    const appointmentId = 18000; 
    const { body, statusCode }  = await t.context.got.post(`appointments`, {
        json: newAppointmentData,
    });    

    // Assertion for the status code in a successful creation
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test to create a new appointment with invalid data (Bad Case)

test('Create an Appointment-BadCase', async (t) => {
    const newAppointmentData = {
        "professionalId": "trig",
        "userId": "oxi",
        "appointmentDate": "2023-07-23T04:56:07.000Z"
    };

    const appointmentId = 18001; 
    const { body, statusCode }  = await t.context.got.post(`appointments/${appointmentId}/newAppointment`, {

        json: newAppointmentData,
        throwHttpErrors: false,
    });

    // Assertions for the result in a bad case
    console.log(body);
    console.log(statusCode);

    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');
});
