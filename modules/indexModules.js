const safeRequest = require('../utils/SafeRequest');

const indexModules = {
  async getAllBooks () {
    const url = '';
    await safeRequest.fetch(url);
  }
}

module.exports = indexModules;
