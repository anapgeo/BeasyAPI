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


test('GET Professionals Details-BadCase', async (t) => {
    const professionalId = "otaksi"; 
    const {body, statusCode}  = await t.context.got(`professionals/${professionalId}`);
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 404, 'Status code should be 404 for a unsuccessful request');
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


test('Update Professional Details-BadCase', async (t) => {
    const professionalId = "om[pamios"; 
    const updatedProfessionalData = {        
        "name": 1234,
        "email": "coolPapakiString"        
    };

    const {body, statusCode}  = await t.context.got.put(`professionals/${professionalId}`, {
        json: updatedProfessionalData,
    });
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 404, 'Status code should be 404 for a unsuccessful request');
});


test('Delete a Professional', async (t) => {
    const professionalId = 0; 


    const {body, statusCode}  = await t.context.got.delete(`professionals/${professionalId}`);
    //console.log(body);
    //console.log(statusCode);
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
    //console.log(body);
    //console.log(statusCode);
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
    });
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 404, 'Status code should be 404 for a unsuccessful request');
});

<<<<<<< HEAD

=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
//////////////////////// USER /////////////////////////
test('GET Users', async (t) => {
    const {body,statusCode}  = await t.context.got("users");
    //console.log(body);
    //console.log(statusCode);
<<<<<<< HEAD

=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.true(Array.isArray(body), 'Response body should be an array');
    t.true(body.length > 0, 'Response should contain at least one user');
    t.is(body[0].name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


<<<<<<< HEAD
//this needs a bad case
test('Get User Details', async (t) => {
    const userId = 0; 
    const {body, statusCode}  = await t.context.got(`users/${userId}`);


test('Get User Details', async (t) => {
    const userId = 0; 
    const {body, statusCode}  = await t.context.got(`users/${userId}`);
    //console.log(body);
    //console.log(statusCode);

=======
test('Get User Details', async (t) => {
    const userId = 0; 
    const {body, statusCode}  = await t.context.got(`users/${userId}`);
    //console.log(body);
    //console.log(statusCode);
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.truthy(body, 'Response should have a body property');
    t.is(body.name, 'name', 'First user should have the expected name');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


<<<<<<< HEAD
//this needs a bad case



=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
test('Update User Details', async (t) => {
    const userId = 0; 
    const updatedUserData = {        
        "name": "coolerName",
        "email": "coolerPapakiString"        
    };

    const {body, statusCode}  = await t.context.got.put(`users/${userId}`, {
        json: updatedUserData,
    });
<<<<<<< HEAD


=======
    //console.log(body);
    //console.log(statusCode);
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


test('Delete a User', async (t) => {
<<<<<<< HEAD

    const userId = 0;
=======
    const userId = 0; 


>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    const {body, statusCode}  = await t.context.got.delete(`users/${userId}`);
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


<<<<<<< HEAD

    const userId = 0; 


    const {body, statusCode}  = await t.context.got.delete(`users/${userId}`);
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});



=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
test('Create a User', async (t) => {
    const newUserData = {
        "name": "something",
        "id": 17,
        "email": "eimail"
      };

    const {body, statusCode}  = await t.context.got.post(`users`, {
        json: newUserData,
    });
<<<<<<< HEAD

    

    //console.log(body);
    //console.log(statusCode);

=======
    //console.log(body);
    //console.log(statusCode);
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});


//////////////////////// APPOINTMENT /////////////////////////

<<<<<<< HEAD


test('Get Appointments by User', async (t) => { 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`);

test('Get Appointments by User', async (t) => {
    const userId = 0; 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`);
    //console.log(body);
    //console.log(statusCode);

=======
test('Get Appointments by User', async (t) => {
    const userId = 0; 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`);
    //console.log(body);
    //console.log(statusCode);
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].userId, userId, 'First appointment should have the expected userId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

<<<<<<< HEAD

test('Get Appointments by User-BadCase', async (t) => { 
    const {body,statusCode}  = await t.context.got(`users/${userId}/appointments`);
    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');
});

=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)

test('Get Appointments by Professional', async (t) => {
    const professionalId = 6; 
    const {body,statusCode}  = await t.context.got(`professionals/${professionalId}/appointments`);
<<<<<<< HEAD


    //console.log(body);
    //console.log(statusCode);

=======
    //console.log(body);
    //console.log(statusCode);
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
    t.true(Array.isArray(body), 'Response body should be an array');
    t.is(body[0].professionalId, professionalId, 'First appointment should have the expected professionalId');
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

<<<<<<< HEAD

test('Get Appointments by Professional-BadCase', async (t) => {
    const professionalId = "yuifgireyf"; 
    const {body,statusCode}  = await t.context.got(`professionals/${professionalId}/appointments`);
    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');
});

=======
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)


test('Create an Appointment', async (t) => {
    const newAppointmentData = {
        "professionalId": 80,
        "userId": 66,
        "appointmentDate": "2023-07-23T04:56:07.000Z"
      };

      const appointmentId = 18000; 

    const {body, statusCode}  = await t.context.got.post(`appointments/${appointmentId}/newAppointment`, {
        json: newAppointmentData,
    });
<<<<<<< HEAD

    
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
});

test('Create an Appointment-BadCase', async (t) => {
    const newAppointmentData = {
        "professionalId": "trig",
        "userId": "oxi",
        "appointmentDate": "2023-07-23T04:56:07.000Z"
      };

      const appointmentId = 18000; 

    const {body, statusCode}  = await t.context.got.post(`appointments/${appointmentId}/newAppointment`, {
        json: newAppointmentData,
    });
    
    t.is(statusCode, 404, 'Status code should be 404 for an unsuccessful request');

    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');

=======
    //console.log(body);
    //console.log(statusCode);
    t.is(statusCode, 200, 'Status code should be 200 for a successful request');
>>>>>>> parent of 9da2a41 (Added Bad Case Test for Appointment)
});