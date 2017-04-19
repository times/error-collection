const { errorCollectionChaiPlugin, ErrorCollection } = require('../index');

const mocha = require('mocha');
const chai = require('chai');
chai.use(errorCollectionChaiPlugin);
const expect = chai.expect;

const throwsErrorCollection = () => {
  throw new ErrorCollection('SOME_ERROR', { name: 'test' });
};

const rejectsWithErrorCollection = () => {
  return Promise.reject(new ErrorCollection('SOME_ERROR', { name: 'test' }));
};

describe('errorCollectionChaiPlugin', () => {
  describe('#throwErrorCollection()', () => {
    it('should pass a valid check', () => {
      expect(() => throwsErrorCollection()).to.throwErrorCollection([
        { code: 'SOME_ERROR', data: { name: 'test' } },
      ]);
    });
  });

  describe('#rejectedWithErrorCollection()', () => {
    it('should pass a valid check', () => {
      return expect(
        rejectsWithErrorCollection()
      ).to.be.rejectedWithErrorCollection([
        { code: 'SOME_ERROR', data: { name: 'test' } },
      ]);
    });
  });
});
