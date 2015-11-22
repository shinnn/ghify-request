'use strict';

const http = require('http');

const ghifyRequest = require('.');
const request = require('request');
const {test} = require('tape');

test('ghifyRequest()', t => {
  t.plan(11);

  t.equal(ghifyRequest.name, 'ghifyRequest', 'should have a function name.');

  ghifyRequest(request)('users/shinnn', (err, response, body) => {
    t.strictEqual(err, null, 'should send a request to api.github.com without base URL.');
    t.strictEqual(body.login, 'shinnn', 'should get the response as JSON object.');
  });

  let count = 0;

  http.createServer(function(req, response) {
    if (req.method === 'POST') {
      req.once('data', data => {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({
          token: req.headers.authorization.replace('token ', ''),
          body: data.toString()
        }));
      });
    } else {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(`This is not JSON${req.headers.authorization.replace('token ', '')}`);
    }

    if (++count === 2) {
      this.close();
    }
  }).listen(8124);

  ghifyRequest(request, {
    baseUrl: 'http://localhost:8124',
    token: 'a',
    method: 'post',
    json: false
  })('/', {body: '1'}, (err, response, body) => {
    t.strictEqual(err, null, 'should send a request with the given method.');
    t.strictEqual(
      body,
      '{"token":"a","body":"1"}',
      'should overwrite options with the second argument.'
    );
  });

  process.env.GITHUB_TOKEN = '!';
  process.env.GITHUB_ENDPOINT = 'http://localhost:8124/';

  ghifyRequest(request, {baseUrl: null})({url: '/'}, (err, response, body) => {
    t.strictEqual(err, null, 'should not fail even if the response is not JSON.');
    t.strictEqual(
      body,
      'This is not JSON!',
      'should receive contents as a plain text when the response is not JSON.'
    );
  });

  t.throws(
    () => ghifyRequest(1),
    /TypeError.*1 is not a function\. Expected a `request` function\. /,
    'should throw a type error when the first argument is not a request.'
  );

  t.throws(
    () => ghifyRequest(request, {token: 1}),
    /TypeError.*1 is not a string\. `token` option must be a string of a Github personal access token\./,
    'should throw a type error when `token` option is not a string.'
  );

  t.throws(
    () => ghifyRequest(request, {baseUrl: 1}),
    /TypeError.*1 is not a string\. `baseUrl` option must be a fully qualified URI string used as the base URL\./,
    'should throw a type error when `baseUrl` option is not a string.'
  );

  t.throws(
    () => ghifyRequest(request, {baseUrl: 'a'}),
    /TypeError.*a is not a URI\. `baseUrl` option must be a fully qualified URI string used as the base URL\./,
    'should throw a type error when `baseUrl` option is not a URI.'
  );
});
