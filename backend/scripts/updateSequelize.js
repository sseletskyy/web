/* eslint-env node */

var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const models = require('../lib/models').default;

models.sequelize.sync({ logging: console.log }).then(() => {
  console.log('models synced');
  process.exit();
});
