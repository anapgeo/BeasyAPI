// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen')
const { professionalsGET, professionalsProfessionalIDGET } = require('../service/DefaultService.js');
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

// Group of tests related to professionals
test('GET Professionals', async (t) => {
    const {body,statusCode}  = await t.context.got("professionals");
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one professional');
    t.is(body[0].profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('GET Professionals by function', async (t) => {
    const result  = await professionalsGET();
    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one professional');
    t.is(result[0].profession, 'profession', 'First professional should have the expected profession value');
    });

test('GET Professionals Details', async (t) => {
    const professionalId = 0; 
    const {body, statusCode}  = await t.context.got(`professionals/${professionalId}`);
    t.truthy(body, 'Response should have a body property');
    t.is(body.profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('GET Professionals Details by function', async (t) => {
    const professionalId = 0; 
    const result  = await professionalsProfessionalIDGET(professionalId);
    t.truthy(result, 'Response should have a body property');
    t.is(result.profession, 'profession', 'First professional should have the expected profession value');    
});

test('GET Professionals Details-BadCase', async (t) => {
    const professionalId = "otaksi"; 
    const {body, statusCode}  = await t.context.got(`professionals/${professionalId}`,{
        throwHttpErrors: false,
        });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});

test('Update Professional Details', async (t) => {
    const professionalId = 0; 
    const updatedProfessionalData = {        
        "name": "coolName",
        "email": "coolPapakiString"        
    };
    const {body, statusCode}  = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
    });
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Update Professional Details-BadCase', async (t) => {
    const professionalId = "om[pamios"; 
    const updatedProfessionalData = {        
        "name": 1234,
        "email": "coolPapakiString"        
    };
    const {body, statusCode}  = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
        throwHttpErrors: false,
    });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});

test('Delete a Professional', async (t) => {
    const professionalId = 0; 
    const {body, statusCode}  = await t.context.got.delete(`professionals/${professionalId}`);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create a Professional', async (t) => {
    const newProfessionalData = {
        "profession": "Mastoras",
        "name": "Bob",
        "id": 24,
        "services": [
          {
            "availableservice": "tsimentoma"
          },
          {
            "availableservice": "plakakia"
          }
        ]
      };

    const {body, statusCode}  = await t.context.got.post(`professionals`, {
        json: newProfessionalData,
    });
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create a Professional-BadCase', async (t) => {
    const newProfessionalData = {
        "profession": 47,
        "name": 90,
        "id": "deskero",
        "services": [
          {
            "availableservice": 6
          },
          {
            "availableservice": "plakakia"
          }
        ]
      };
    const {body, statusCode}  = await t.context.got.post(`professionals`, {
        json: newProfessionalData,
        throwHttpErrors: false,
    });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});