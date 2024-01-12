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
  var code;
  var payload;

  // Check if arg1 is an instance of ResponsePayload, if true, recursively call writeJson
  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine code and payload from provided arguments
  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  // If no code is provided, default to 200
  if(!code) {
    code = 200;
  }

  // If payload is an object, convert it to a JSON string with indentation
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Set response headers and end the response
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}