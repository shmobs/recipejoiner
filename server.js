const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const history = require('connect-history-api-fallback');
const routes = require('./routes/routes.js');

const PORT = process.argv[2] || process.env.PORT || 3000;

const app = express();
// On every request, use the logger
app.use(logger('dev'));
// Similarly, parse json data from the request body
app.use(bodyParser.json());
app.use('/api', routes);
// Serve the 'dist' directory as static files
app.use(express.static(path.join(__dirname, 'dist')));
//Set up defined routes on that path
// Serve the 'public' directory as static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(history({ logger }));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
