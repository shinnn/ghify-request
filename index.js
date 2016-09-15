'use strict';

const util = require('util');

const ghifyRequestOptions = require('ghify-request-options');

module.exports = function ghifyRequest(request, options) {
  if (typeof request !== 'function') {
    throw new TypeError(
      util.inspect(request) +
      ' is not a function. Expected a `request` function. https://github.com/request/request'
    );
  }

  return request.defaults(ghifyRequestOptions(options));
};
