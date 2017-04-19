class ErrorCollection {
  constructor(...args) {
    this._errors = [];

    if (args.length > 0) this.addError(...args);
  }

  addError(code, data = null) {
    if (!code) throw new Error('No code supplied');

    this._errors = [{ code, data }, ...this._errors];
    return this;
  }

  getErrors() {
    return this._errors;
  }
}

module.exports = ErrorCollection;
