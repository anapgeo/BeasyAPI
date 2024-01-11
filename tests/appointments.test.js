// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen');
const { usersUserIdAppointmentsGET, professionalsProfessionalIdAppointmentsGET } = require('../service/DefaultService.js');
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

// Group of tests related to appointments

// Test: Get Appointments by User
test('Get Appointments by User', async (t) => {
    const userId = 0;
    
    // Make a GET request to the endpoint for user appointments
    const { body, statusCode } = await t.context.got(`users/${userId}/appointments`);
    
    // Assertions
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].userId, userId, 'First appointment should have the expected userId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Get Appointments by User by function
test('Get Appointments by User by function', async (t) => {
    const userId = 0;
    
    // Call the function to get user appointments
    const result = await usersUserIdAppointmentsGET(userId);
    
    // Assertions
    t.true(Array.isArray(result), 'Response body should be an array');
    t.is(result[0].userId, userId, 'First appointment should have the expected userId');
});

// Test: Get Appointments by User - Bad Case
test('Get Appointments by User-BadCase', async (t) => {
    const userId = 0;
    
    // Make a GET request to the endpoint for user appointments with error handling
    const { body, statusCode } = await t.context.got(`users/${userId}/appointments`, {
        throwHttpErrors: false,
    });
    
    // Assertions
    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');
});

// Similar tests for appointments by professionals...

// Test: Create an Appointment
test('Create an Appointment', async (t) => {
    const newAppointmentData = {
        "professionalId": 80,
        "userId": 66,
        "appointmentDate": "2023-07-23T04:56:07.000Z"
    };
    
    // Make a POST request to create a new appointment
    const { body, statusCode } = await t.context.got.post(`appointments`, {
        json: newAppointmentData,
    });
    
    // Assertions
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

// Test: Create an Appointment - Bad Case
test('Create an Appointment-BadCase', async (t) => {
    const newAppointmentData = {
        "professionalId": "trig",
        "userId": "oxi",
        "appointmentDate": "2023-07-23T04:56:07.000Z"
    };
    
    // Make a POST request to create a new appointment with error handling
    const { body, statusCode } = await t.context.got.post(`appointments/18001/newAppointment`, {
        json: newAppointmentData,
        throwHttpErrors: false,
    });

    // Log response for debugging
    console.log(body);
    console.log(statusCode);
    
    // Assertions
    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');
});
