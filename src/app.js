const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mohd Suhel'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mohd Suhel'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mohd Suhel',
    issue: 'What is the issue ?'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please , provide the address which weather you want to see.....'
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }

      forecast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          location,
          foreCast: foreCastData,
          address: req.query.address
        });
      });
    }
  );
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help artical not found :(',
    name: 'Mohd Suhel'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'page not found :(',
    name: 'Mohd Suhel'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
