const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const history = require('connect-history-api-fallback');

const PORT = process.argv[2] || process.env.PORT || 3000;

const app = express();
// On every request, use the logger
app.use(logger('dev'));
// Similarly, parse json data from the request body
app.use(bodyParser.json());
// Serve the 'dist' directory as static files
app.use(express.static(path.join(__dirname, 'dist')));
// Serve the 'public' directory as static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(history({ logger }));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
