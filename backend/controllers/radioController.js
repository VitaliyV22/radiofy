const radioData = require('../data/radioData.json')

function getRadioData(req, res) {
  res.json(radioData);
}

module.exports = { getRadioData };
