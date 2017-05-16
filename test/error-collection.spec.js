const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const { ErrorCollection } = require('../index');

describe('ErrorCollection', () => {
  let error;

  beforeEach(() => {
    error = new ErrorCollection('SAMPLE_ERROR');
  });

  describe('#constructor()', () => {
    it('should construct when no initial error string is passed', () => {
      error = new ErrorCollection();
      expect(error).to.be.instanceof(ErrorCollection);
    });

    it('should store the error string supplied during construction', () => {
      error = new ErrorCollection('MY_ERROR');
      expect(error.getErrors().length).to.equal(1);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'MY_ERROR',
          data: null,
        },
      ]);
    });

    it('should store the error string and data supplied during construction', () => {
      error = new ErrorCollection('MY_ERROR', { number: 1 });
      expect(error.getErrors().length).to.equal(1);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'MY_ERROR',
          data: { number: 1 },
        },
      ]);
    });
  });

  describe('#addError()', () => {
    it('should throw if no code is supplied', () => {
      expect(() => error.addError()).to.throw(Error, /No code supplied/);
    });

    it('should return an instance of ErrorCollection', () => {
      const returnValue = error.addError('SOME_ERROR');
      expect(returnValue).to.be.instanceof(ErrorCollection);
    });

    it('should store the supplied error', () => {
      error.addError('SOME_ERROR');
      expect(error.getErrors().length).to.equal(2);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'SOME_ERROR',
          data: null,
        },
        {
          code: 'SAMPLE_ERROR',
          data: null,
        },
      ]);
    });

    it('should store the supplied error and associated data', () => {
      error.addError('SOME_ERROR', { adapter: 'redis' });
      expect(error.getErrors().length).to.equal(2);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'SOME_ERROR',
          data: { adapter: 'redis' },
        },
        {
          code: 'SAMPLE_ERROR',
          data: null,
        },
      ]);
    });
  });

  describe('#mergeWith()', () => {
    it('should remain unchanged when no other collections are passed', () => {
      error.addError('SECOND_ERROR', 2);

      error.mergeWith();

      expect(error.getErrors().length).to.equal(2);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'SECOND_ERROR',
          data: 2,
        },
        {
          code: 'SAMPLE_ERROR',
          data: null,
        },
      ]);
    });

    it('should merge with other collections, left to right', () => {
      const error2 = new ErrorCollection('SECOND_ERROR', 2);
      const error3 = new ErrorCollection('THIRD_ERROR', 3);

      error.mergeWith(error2, error3);

      expect(error.getErrors().length).to.equal(3);
      expect(error.getErrors()).to.deep.equal([
        {
          code: 'THIRD_ERROR',
          data: 3,
        },
        {
          code: 'SECOND_ERROR',
          data: 2,
        },
        {
          code: 'SAMPLE_ERROR',
          data: null,
        },
      ]);
    });
  });

  describe('#getErrors()', () => {
    it('should return a array of error objects', () => {
      const errors = error.getErrors();

      expect(errors).to.be.an('array');
      expect(errors.length).to.equal(1);
    });
  });
});
