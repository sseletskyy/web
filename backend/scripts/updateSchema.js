/* eslint-env node */
var fs = require('fs');
var path = require('path');

require('babel-polyfill');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

var graphql = require('graphql').graphql;
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var printSchema = require('graphql/utilities').printSchema;

var logger = require('../lib/utils/logger').default;
var schema = require('../lib/graphql/schema').default;

// Save JSON of full schema introspection for Babel Relay Plugin to use
(function() {
  graphql(schema, introspectionQuery)
    .then(function(result) {
      if (result.errors) {
        logger.error(
          'ERROR introspecting schema: ',
          JSON.stringify(result.errors, null, 2)
        );
      } else {
        fs.writeFileSync(
          path.resolve(__dirname, '..', 'schema.json'),
          JSON.stringify(result, null, 2)
        );
      }
    });
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.resolve(__dirname, '..', 'schema.graphql'),
  printSchema(schema)
);
