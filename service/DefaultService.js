'use strict';


/**
 * Arrange an appointment
 *
 * body AppointmentRequest 
 * appointmentId Integer 
 * no response value expected for this operation
 **/
exports.appointmentsAppointmentIdAppointmentPOST = function(body,appointmentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of appointments by a user
 *
 * professionalId Integer 
 * returns List
 **/
exports.professiomalsProfessionalIdAppointmentsGET = function(professionalId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "professionalId" : 6,
  "userId" : 0,
  "appointmentDate" : "2000-01-23T04:56:07.000Z"
}, {
  "professionalId" : 6,
  "userId" : 0,
  "appointmentDate" : "2000-01-23T04:56:07.000Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of professionals
 *
 * returns List
 **/
exports.professionalsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "profession" : "profession",
  "name" : "name",
  "id" : 0,
  "services" : [ {
    "availableservice" : "availableservice"
  }, {
    "availableservice" : "availableservice"
  } ]
}, {
  "profession" : "profession",
  "name" : "name",
  "id" : 0,
  "services" : [ {
    "availableservice" : "availableservice"
  }, {
    "availableservice" : "availableservice"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new professional
 *
 * body Professionals 
 * no response value expected for this operation
 **/
exports.professionalsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a professional
 *
 * professionalID Integer 
 * no response value expected for this operation
 **/
exports.professionalsProfessionalIDDELETE = function(professionalID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get details of a professionals
 *
 * professionalID Integer 
 * returns Professionals
 **/
exports.professionalsProfessionalIDGET = function(professionalID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "profession" : "profession",
  "name" : "name",
  "id" : 0,
  "services" : [ {
    "availableservice" : "availableservice"
  }, {
    "availableservice" : "availableservice"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update professional's details
 *
 * body UserUpdate 
 * professionalId Integer 
 * no response value expected for this operation
 **/
exports.professionalsprofessionalIdPUT = function(body,professionalId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of users
 *
 * returns List
 **/
exports.usersGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 0,
  "email" : "email"
}, {
  "name" : "name",
  "id" : 0,
  "email" : "email"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create a new user
 *
 * body User 
 * no response value expected for this operation
 **/
exports.usersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of appointments by a user
 *
 * userId Integer 
 * returns List
 **/
exports.usersUserIdAppointmentsGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "professionalId" : 6,
  "userId" : 0,
  "appointmentDate" : "2000-01-23T04:56:07.000Z"
}, {
  "professionalId" : 6,
  "userId" : 0,
  "appointmentDate" : "2000-01-23T04:56:07.000Z"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a user
 *
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersUserIdDELETE = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get details of a user
 *
 * userId Integer 
 * returns User
 **/
exports.usersUserIdGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 0,
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update user details
 *
 * body UserUpdate 
 * userId Integer 
 * no response value expected for this operation
 **/
exports.usersUserIdPUT = function(body,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

