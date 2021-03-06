require('dotenv').config();

const admin = require('firebase-admin');
const express = require('express');
require('express-async-errors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { HttpError } = require('./api/lib/utils/http-error');

const buildPath = path.join(__dirname, '../../dist');

const apiRouter = require('./api/routes/api-router');

require('./config/db');

if (process.env.NODE_ENV !== 'development') {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        // eslint-disable-next-line @typescript-eslint/camelcase
        project_id: process.env.FIREBASE_PROJECT_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: process.env.FIREBASE_CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        auth_uri: process.env.FIREBASE_AUTH_URI,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_uri: process.env.FIREBASE_TOKEN_URI,
        // eslint-disable-next-line @typescript-eslint/camelcase
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

const app = express();

app.use(express.static(buildPath));

app.locals.ENV = process.env.NODE_ENV;
app.locals.ENV_DEVELOPMENT = process.env.NODE_ENV === 'development';

app.disable('x-powered-by');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(morgan('dev', {stream: winston.stream}));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);
app.use(cookieParser());
app.use(cors());

app.use(process.env.API_PATH, apiRouter);

app.use((err, req, res, next) => {
  console.log('Got here!');
  if (res.headersSent) {
    console.log('headers sent...');
    return next(err);
  }

  if (err instanceof HttpError) {
    res.status(err.httpStatus);
    console.log('AAKJSDHJKASHDLASDJSD');
    if (err.body) {
      return res.json(err.body);
    }
    return res.send({ error: err.message });
  }

  res.status(500).send({ error: err || 'Unknown error' });
});

app.use('/api/', function (req, res) {
  res.status(404).send("Sorry can't find that!");
});

// If "/api" is called, redirect to the API documentation.
app.use('/api', function (req, res) {
  res.redirect(`${process.env.API_PATH}/documentation`);
});

app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
