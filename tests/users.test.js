// Import necessary modules and dependencies
const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen')
const { usersGET, usersUserIdGET } = require('../service/DefaultService.js');
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

// Group of tests related to users
test('GET Users', async (t) => {
    const {body,statusCode}  = await t.context.got("users");
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one user');
    t.is(body[0].name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('GET Users by function', async (t) => {
    const result  = await usersGET();
    t.true(Array.isArray(result), 'Response body should be an array');
    t.true(result.length > 0, 'Response should contain at least one user');
    t.is(result[0].name, 'name', 'First user should have the expected name'); 
});

test('Get User Details', async (t) => {
    const userId = 0; 
    const {body, statusCode}  = await t.context.got(`users/${userId}`);
    t.truthy(body, 'Response should have a body property');
    t.is(body.name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Get User Details by function', async (t) => {
    const userId = 0; 
    const result  = await usersUserIdGET(userId);
    t.truthy(result, 'Response should have a body property');
    t.is(result.name, 'name', 'First user should have the expected name');
});

test('Get User Details-BadCase', async (t) => {
    const userId = "ifspoefjs"; 
    const {body, statusCode}  = await t.context.got(`users/${userId}`,{
        throwHttpErrors: false,
        });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});

test('Update User Details', async (t) => {
    const userId = 0; 
    const updatedUserData = {        
        "name": "coolerName",
        "email": "coolerPapakiString"        
    };
    const {body, statusCode}  = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
    });
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Update User Details-BadCase', async (t) => {
    const userId = 0; 
    const updatedUserData = {        
        "name": 236754,
        "email": "coolerPapakiString"        
    };
    const {body, statusCode}  = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
        throwHttpErrors: false,
    });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});

test('Delete a User', async (t) => {
    const userId = 0;
    const {body, statusCode}  = await t.context.got.delete(`users/${userId}`);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create a User', async (t) => {
    const newUserData = {
        "name": "something",
        "id": 17,
        "email": "eimail"
      };
    const {body, statusCode}  = await t.context.got.post(`users`, {
        json: newUserData,
    });
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create a User-BadCase', async (t) => {
    const newUserData = {
        "name": 476,
        "id": "fg",
        "email": "eimail"
      };

    const {body, statusCode}  = await t.context.got.post(`users`, {
        json: newUserData,
        throwHttpErrors: false,
    });
    t.is(statusCode, 400, 'Status code should be 400 for a unsuccessful request');
});