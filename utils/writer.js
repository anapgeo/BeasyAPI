// Constructor function for creating a response payload object with code and payload properties
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to generate a response with a specific code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}


