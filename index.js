'use strict';

const ghifyRequestOptions = require('ghify-request-options');

module.exports = function ghifyRequest(request, options) {
  if (typeof request !== 'function') {
    throw new TypeError(
      String(request) +
      ' is not a function. Expected a `request` function. https://github.com/request/request'
    );
  }

  return request.defaults(ghifyRequestOptions(options));
};
