# Error Collection

> Allows collections of errors to be built and bubbled up through an application

[![Build Status](https://travis-ci.org/times/error-collection.svg?branch=master)](https://travis-ci.org/times/error-collection) [![Code coverage](https://codecov.io/gh/times/error-collection/branch/master/graph/badge.svg)](https://codecov.io/gh/times/error-collection) [![npm version](https://badge.fury.io/js/%40times%2Ferror-collection.svg)](https://badge.fury.io/js/%40times%2Ferror-collection)

## Usage

```js
// Create an error with attached data
const error = new ErrorCollection('INVALID_ID', { id });

// You can append more errors to the chain
error.addError('ANOTHER_ERROR');

// And then get all the errors back
error.getErrors();
```


## Contributing

Pull requests are very welcome. Please include a clear description of any changes, and full test coverage.

During development you can run tests with

    npm test


## Contact

Chris Hutchinson <chris.hutchinson@thetimes.co.uk>