const express = require('express');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');

const controllers = require('./controllers/index.js');
const helpers = require('./views/helpers/index');

require('env2')('./config.env');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
  helpers,
}));

app.set('port', process.env.PORT || 3000);

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(controllers);

module.exports = app;
