const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Map global promise - no warning - may not be necessary
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jotideas', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

require('./models/Idea');
const Idea = mongoose.model('ideas');

// app.use(function(req, res, next) {
//   console.log(Date.now());
//   req.name = 'Baltazar';
//   next();
// });

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

app.post('/ideas', (req, res) => {
  let errors = [];
  if (!req.body.details) {
    errors.push({text: 'Please add details'});
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors,
      title: req.body.title,
    });
  } else {
    res.send('passed');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
