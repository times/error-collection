const { ErrorCollection } = require('../index');

module.exports = (chai, utils) => {
  const assertIsValidErrorCollection = (err, data) => {
    new chai.Assertion(err).to.be.instanceof(ErrorCollection);
    new chai.Assertion(err.getErrors()).to.deep.equal(data);
  };

  const handleFailure = (err, data) => {
    // An AssertionError means this._obj did not throw / reject
    if (err instanceof chai.AssertionError) {
      throw err;
    } else {
      // Any other kind of error means this._obj did throw / reject,
      // but we still need to check whether `err` is an ErrorCollection
      assertIsValidErrorCollection(err, data);
    }
  };

  // For try/catch
  chai.Assertion.addMethod('throwErrorCollection', function(data) {
    try {
      this._obj();
      // If this line was reached then this._obj did not throw
      throw new chai.AssertionError(
        'Expected method to throw an ErrorCollection, but it succeeded'
      );
    } catch (err) {
      handleFailure(err, data);
    }
  });

  // For promises
  chai.Assertion.addMethod('rejectedWithErrorCollection', function(data) {
    return this._obj
      .then(() => {
        // If this line was reached then this._obj did not reject
        throw new chai.AssertionError(
          'Expected promise to reject with an ErrorCollection, but it succeeded'
        );
      })
      .catch(err => handleFailure(err, data));
  });
};
