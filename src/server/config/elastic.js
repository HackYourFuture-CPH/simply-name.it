require('dotenv').config({ path: '../../.env' });

const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  cloud: {
    id: process.env.ES_CLOUD_ID,
  },
  auth: {
    apiKey: process.env.ES_API_KEY,
  },
});
const usersIndex = 'users';

module.exports = { client, usersIndex };
