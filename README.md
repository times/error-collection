# Error Collection

> Allows collections of errors to be bubbled up through an application

[![Build Status](https://travis-ci.org/times/error-collection.svg?branch=master)](https://travis-ci.org/times/error-collection) [![Code coverage](https://codecov.io/gh/times/error-collection/branch/master/graph/badge.svg)](https://codecov.io/gh/times/error-collection) [![npm version](https://badge.fury.io/js/%40times%2Ferror-collection.svg)](https://badge.fury.io/js/%40times%2Ferror-collection)

## Usage

```js
// Load the library
const { ErrorCollection } = require('@times/error-collection');

// Create an error with attached data
const error = new ErrorCollection('INVALID_ID', { id });

// You can append more errors to the chain
error.addError('ANOTHER_ERROR');

// And then get all the errors back
error.getErrors();
```


## Chai plugin

There is a Chai plugin that adds `throwErrorCollection()` and `rejectedWithErrorCollection()` methods which can be used for testing.

```js
// Load the plugin
const { errorCollectionChaiPlugin } = require('@times/error-collection');

// Load chai and initialise the plugin
const chai = require('chai');
chai.use(errorCollectionChaiPlugin);
const expect = chai.expect;

// Write your tests
describe('myThing', () => {
  describe('#myMethod()', () => {
    it('should pass a valid check', () => {
      expect(() => {}).to.throwErrorCollection([
        { code: 'SOME_ERROR', data: { name: 'test' } },
      ]);
    });


    it('should pass a valid promise check', () => {
      return expect(
        myFunction()
      ).to.be.rejectedWithErrorCollection([
        { code: 'SOME_ERROR', data: { name: 'test' } },
      ]);
    });
  });
});
```


## Contributing

Pull requests are very welcome. Please include a clear description of any changes, and full test coverage.

During development you can run tests with

    npm test
