const http = require('http');
const test = require('ava');
const got = require('got');
const listen = require('test-listen')

const { professionalsGET } = require('../service/DefaultService.js');
const app =require('../index.js');

// test('Random Test', t => {
//     t.pass();
// });

// const addNumbers = (a, b) => a + b;

// test('Add Numbers', t=> {
//     t.is(addNumbers(1, 2), 3);
//     t.is(addNumbers(3, 5), 8);
//     t.is(addNumbers(-1, 2), 1);
//     t.is(addNumbers(0, 0), 0);
//     t.is(addNumbers("1", "2"), "12");
//     //t.is(addNumbers("1","2"),3);
//     t.is(addNumbers("1",2),"12");
//     t.is(addNumbers(undefined, 2), NaN);
//     t.is(addNumbers(), NaN);
// });

// test('Async', async t => {
//     const res = Promise.resolve('test');
//     t.is(await res, 'test');
// });

// test('Get Professionals by function', async t => {
//     const result = await professionalsGET();
//     // console.log(result[0]);
//     t.is(result.length, 2);
//     t.is(result[0].profession, "profession");
// });

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got = got.extend({ prefixUrl: t.context.prefixUrl, responseType: 'json' });
});

test.after.always((t) => {
    t.context.server.close();
});

test('GET Professionals', async (t) => {
    const {body,statusCode}  = await t.context.got("professionals");
    //console.log(body);
    //console.log(statusCode);
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one professional');
    t.is(body[0].profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('GET Professionals Details', async (t) => {
    const professionalId = 0; 
    const {body, statusCode}  = await t.context.got(`professionals/${professionalId}`);
    //console.log(body);
    //console.log(statusCode);
    t.truthy(body, 'Response should have a body property');
    t.is(body.profession, 'profession', 'First professional should have the expected profession value');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
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
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Delete a Professional', async (t) => {
    const professionalId = 0; 


    const {body, statusCode}  = await t.context.got.delete(`professionals/${professionalId}`);
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});