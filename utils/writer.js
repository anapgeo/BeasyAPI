// Constructor function for creating a response payload object with code and payload properties
function ResponsePayload(code, payload) {
  this.code = code || 200;
  this.payload = payload;
}

// Function to generate a response with a specific code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
};

// Function to write JSON response to the provided HTTP response object
exports.writeJson = function(response, arg1, arg2) {
  let code = arg2 && Number.isInteger(arg2) ? arg2 : arg1 && Number.isInteger(arg1) ? arg1 : 200;
  let payload = arg2 ? arg1 : arg1;

  // If payload is an object, convert it to a JSON string with indentation
  payload = typeof payload === 'object' ? JSON.stringify(payload, null, 2) : payload;

  // Set response headers and end the response
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
};
