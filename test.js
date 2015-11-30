'use strict';

const ghifyRequest = require('.');
const request = require('request');
const {test} = require('tape');

test('ghifyRequest()', t => {
  t.plan(4);

  t.equal(ghifyRequest.name, 'ghifyRequest', 'should have a function name.');

  ghifyRequest(request)('users/shinnn', (err, response, body) => {
    t.strictEqual(err, null, 'should send a request to api.github.com without base URL.');
    t.strictEqual(body.login, 'shinnn', 'should get the response as JSON object.');
  });

  t.throws(
    () => ghifyRequest(1),
    /TypeError.*1 is not a function\. Expected a `request` function\. /,
    'should throw a type error when the first argument is not a request.'
  );
});
