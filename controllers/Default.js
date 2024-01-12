'use strict';

// Importing necessary modules
var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Handler for creating a new appointment by ID
module.exports.appointmentsAppointmentIdAppointmentPOST = function appointmentsAppointmentIdAppointmentPOST(req, res, body) {
  Default.appointmentsAppointmentIdAppointmentPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving a list of professionals
module.exports.professionalsGET = function professionalsGET(req, res) {
  Default.professionalsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for creating a new professional
module.exports.professionalsPOST = function professionalsPOST(req, res,  body) {
  Default.professionalsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for deleting a professional by ID
module.exports.professionalsProfessionalIDDELETE = function professionalsProfessionalIDDELETE(req, res, professionalID) {
  Default.professionalsProfessionalIDDELETE(professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving a professional by ID
module.exports.professionalsProfessionalIDGET = function professionalsProfessionalIDGET(req, res,  professionalID) {
  Default.professionalsProfessionalIDGET(professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving appointments of a professional by ID
module.exports.professionalsProfessionalIdAppointmentsGET = function professionalsProfessionalIdAppointmentsGET(req, res, professionalId) {
  Default.professionalsProfessionalIdAppointmentsGET(professionalId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for updating a professional by ID
module.exports.professionalsprofessionalIdPUT = function professionalsprofessionalIdPUT(req, res, body, professionalID) {
  Default.professionalsprofessionalIdPUT(body, professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving a list of users
module.exports.usersGET = function usersGET(req, res) {
  Default.usersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for creating a new user
module.exports.usersPOST = function usersPOST(req, res, body) {
  Default.usersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving appointments of a user by ID
module.exports.usersUserIdAppointmentsGET = function usersUserIdAppointmentsGET(req, res, userId) {
  Default.usersUserIdAppointmentsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for deleting a user by ID
module.exports.usersUserIdDELETE = function usersUserIdDELETE(req, res, userId) {
  Default.usersUserIdDELETE(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for retrieving a user by ID
module.exports.usersUserIdGET = function usersUserIdGET(req, res, userId) {
  Default.usersUserIdGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Handler for updating a user by ID
module.exports.usersUserIdPUT = function usersUserIdPUT(req, res,  body, userId) {
  Default.usersUserIdPUT(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};