# ghify-request

[![NPM version](https://img.shields.io/npm/v/ghify-request.svg)](https://www.npmjs.com/package/ghify-request)
[![Build Status](https://travis-ci.org/shinnn/ghify-request.svg?branch=master)](https://travis-ci.org/shinnn/ghify-request)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/ghify-request.svg)](https://coveralls.io/github/shinnn/ghify-request)
[![Dependency Status](https://david-dm.org/shinnn/ghify-request.svg)](https://david-dm.org/shinnn/ghify-request)
[![devDependency Status](https://david-dm.org/shinnn/ghify-request/dev-status.svg)](https://david-dm.org/shinnn/ghify-request#info=devDependencies)

Create a [Request](https://www.npmjs.com/package/request) wrapper to interact with the [GitHub API](https://developer.github.com/v3/)

```javascript
const ghifyRequest = require('ghify-request');
const request = require('request');

const ghifiedRequest = ghifyRequest(request);
ghifiedRequest('users/shinnn', (err, response, body) => {
  body.login; //=> 'shinnn'
})
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install ghify-request
```

## API

```javascript
const ghifyRequest = require('ghify-request');
```

### ghifyRequest(*request*[, *options*])

*request*: `Function` ([`Request`](https://github.com/request/request#requestoptions-callback) function)  
*options*: `Object` ([`Request` options](https://github.com/request/request#requestoptions-callback))  
Return: `Function` (new `Request` wrapper)

It returns a [`Request`](https://github.com/request/request) wrapper that defaults to the options for easily interacting with the [GitHub API](https://developer.github.com/v3/#overview).

#### options.token

Type: `String`  
Default: `process.env.GITHUB_TOKEN`

Use specific [GitHub access token](https://github.com/blog/1509-personal-api-tokens).

```javascript
const ghifyRequest = require('ghify-request');
const request = require('request');

// https://developer.github.com/v3/gists/#star-a-gist
ghifyRequest(request, {
  token: 'xxxxxxx' // your personal access token
}).put({
  uri: '/gists/908bced575270f6ef80e/star'
}).on('response', () => {
  console.log('Starred the gist https://gist.github.com/shinnn/908bced575270f6ef80e.');
});
```

#### options.baseUrl

Type: `String`  
Default: `process.env.GITHUB_ENDPOINT` if available, otherwise `'https://api.github.com'`

Use the different [endpoint](https://developer.github.com/v3/#root-endpoint) to support [Github enterprise](https://enterprise.github.com/).

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
