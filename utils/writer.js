// Constructor function for creating a response payload object with code and payload properties
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to generate a response with a specific code and payload
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Function to write JSON response to the provided HTTP response object
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var { code, payload } = determineCodeAndPayload(arg1, arg2);
  code = code || 200;

  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  setResponseHeadersAndEnd(response, code, payload);
}

// Helper function to determine code and payload from arguments
function determineCodeAndPayload(arg1, arg2) {
  var code, payload;

if (arg1 && arg1 instanceof ResponsePayload) {
    return determineCodeAndPayload(arg1.payload, arg1.code);
  }

  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }

  if (arg1) {
    payload = arg1;
  }

  return { code, payload };
}

// Helper function to set response headers and end the response
function setResponseHeadersAndEnd(response, code, payload) {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
}