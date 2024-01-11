// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen')
const { usersUserIdAppointmentsGET, professionalsProfessionalIdAppointmentsGET } = require('../service/DefaultService.js');
const app =require('../index.js');

// Setup before and after hooks
test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
});

// Group of tests related to appointments
test('Get Appointments by User', async (t) => {
    const userId = 0; 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`);
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].userId, userId, 'First appointment should have the expected userId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Get Appointments by User by function', async (t) => {
    const userId = 0; 
    const result = await usersUserIdAppointmentsGET(userId);
    t.true(Array.isArray(result), 'Response body should be an array');
    t.is(result[0].userId, userId, 'First appointment should have the expected userId'); 
});

test('Get Appointments by User-BadCase', async (t) => { 
    const userId = 0; 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`,{
        throwHttpErrors: false,
        });
    t.is(statusCode, 200, 'Status code should be 404 for an unsuccessful request');
});

test('Get Appointments by Professional', async (t) => {
    const professionalId = 6; 
    const {body,statusCode}  = await t.context.got(`professionals/${professionalId}/appointments`);
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].professionalId, professionalId, 'First appointment should have the expected professionalId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Get Appointments by Professional by function', async (t) => {
    const professionalId = 6; 
    const result  = await professionalsProfessionalIdAppointmentsGET(professionalId);
    t.true(Array.isArray(result), 'Response body should be an array');
    t.is(result[0].professionalId, professionalId, 'First appointment should have the expected professionalId');
});

test('Get Appointments by Professional-BadCase', async (t) => {
    const professionalId = "yuifgireyf"; 
    const {body,statusCode}  = await t.context.got(`professionals/${professionalId}/appointments`,{
        throwHttpErrors: false,
        });
    t.is(statusCode, 400, 'Status code should be 400 for an unsuccessful request');
});

test('Create an Appointment', async (t) => {
    const newAppointmentData = {
        "professionalId": 80,
        "userId": 66,
        "appointmentDate": "2023-07-23T04:56:07.000Z"
    };
    const appointmentId = 18000; 
    const {body, statusCode}  = await t.context.got.post(`appointments`, {
        json: newAppointmentData,
    });    
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create an Appointment-BadCase', async (t) => {
    const newAppointmentData = {
        "professionalId": "trig",
        "userId": "oxi",
        "appointmentDate": "2023-07-23T04:56:07.000Z"
      };
    const appointmentId = 18001; 
    const {body, statusCode}  = await t.context.got.post(`appointments/${appointmentId}/newAppointment`, {
        json: newAppointmentData,
        throwHttpErrors: false,
    });
    console.log(body);
    console.log(statusCode);
    t.is(statusCode, 404, 'Status code should be 404 for a unsuccessful request');
});