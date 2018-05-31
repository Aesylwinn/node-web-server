const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((request, response, next) => {
  var now = new Date().toString();
  var message = `${now}: ${request.method} ${request.url}`;
  console.log(message);
  fs.appendFile('server.log', message + '\n', (error) => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {});
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Eeeeek! Is that a human!'
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Error handling request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
