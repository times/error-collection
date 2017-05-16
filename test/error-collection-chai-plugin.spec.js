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

    it('should fail if the method does not throw', () => {
      try {
        expect(() => 'success').to.throwErrorCollection([
          { code: 'SOME_ERROR', data: null },
        ]);

        // If this line is reached it means the plugin failed to throw
        // an AssertionError, which means this test should fail
        expect(true).to.be.false;
      } catch (e) {
        expect(e).to.be.instanceof(chai.AssertionError);
        expect(e.message).to.equal(
          'Expected method to throw an ErrorCollection, but it succeeded'
        );
      }
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

    it('should fail if the promise does not reject', () => {
      return expect(Promise.resolve()).to.be
        .rejectedWithErrorCollection([{ code: 'SOME_ERROR', data: null }])
        .then(() => {
          // If this line is reached it means the plugin failed to throw
          // an AssertionError, which means this test should fail
          expect(true).to.be.false;
        })
        .catch(e => {
          expect(e).to.be.instanceof(chai.AssertionError);
          expect(e.message).to.equal(
            'Expected promise to reject with an ErrorCollection, but it succeeded'
          );
        });
    });
  });
});
