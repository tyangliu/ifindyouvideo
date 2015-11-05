'use strict';

var babelRelayPlugin   = require('babel-relay-plugin');
var request            = require('sync-request');
var introspectionQuery = require('./introspectionQuery');

var serverUrl = 'http://127.0.0.1:8080';
var response = request('POST', serverUrl, {
  json: { query: introspectionQuery }
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true,
});
