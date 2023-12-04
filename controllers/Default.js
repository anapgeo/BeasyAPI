'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.appointmentsAppointmentIdAppointmentPOST = function appointmentsAppointmentIdAppointmentPOST (req, res, next, body, appointmentId) {
  Default.appointmentsAppointmentIdAppointmentPOST(body, appointmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsGET = function professionalsGET (req, res, next) {
  Default.professionalsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsPOST = function professionalsPOST (req, res, next, body) {
  Default.professionalsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsProfessionalIDDELETE = function professionalsProfessionalIDDELETE (req, res, next, professionalID) {
  Default.professionalsProfessionalIDDELETE(professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsProfessionalIDGET = function professionalsProfessionalIDGET (req, res, next, professionalID) {
  Default.professionalsProfessionalIDGET(professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsProfessionalIdAppointmentsGET = function professionalsProfessionalIdAppointmentsGET (req, res, next, professionalId) {
  Default.professionalsProfessionalIdAppointmentsGET(professionalId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.professionalsprofessionalIdPUT = function professionalsprofessionalIdPUT (req, res, next, body, professionalID) {
  Default.professionalsprofessionalIdPUT(body, professionalID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersGET = function usersGET (req, res, next) {
  Default.usersGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersPOST = function usersPOST (req, res, next, body) {
  Default.usersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdAppointmentsGET = function usersUserIdAppointmentsGET (req, res, next, userId) {
  Default.usersUserIdAppointmentsGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdDELETE = function usersUserIdDELETE (req, res, next, userId) {
  Default.usersUserIdDELETE(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdGET = function usersUserIdGET (req, res, next, userId) {
  Default.usersUserIdGET(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersUserIdPUT = function usersUserIdPUT (req, res, next, body, userId) {
  Default.usersUserIdPUT(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
