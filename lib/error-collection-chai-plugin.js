const { ErrorCollection } = require('../index');

module.exports = (chai, utils) => {
  const assertIsValidErrorCollection = (err, data) => {
    new chai.Assertion(err).to.be.instanceof(ErrorCollection);
    new chai.Assertion(err.getErrors()).to.deep.equal(data);
  };

  chai.Assertion.addMethod('throwErrorCollection', function(data) {
    try {
      this._obj();
    } catch (err) {
      assertIsValidErrorCollection(err, data);
    }
  });

  chai.Assertion.addMethod('rejectedWithErrorCollection', function(data) {
    return this._obj.catch(err => assertIsValidErrorCollection(err, data));
  });
};
