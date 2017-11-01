const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

app.post('/calc', function(req, res) {
  var actions = req.body;
  console.log(actions);
  var answer = Number(actions[0]);
  console.log(answer, typeof answer);
  for (var i = 2; i < actions.length; i += 2) {
    var operator = actions[i - 1];
    console.log(operator);
    if (operator === '+') {
      answer = answer + Number(actions[i]);
    } else if (operator === '-') {
      answer = answer - Number(actions[i]);
    } else if (operator === '*') {
      answer = answer * Number(actions[i]);
    } else {
      answer = answer / Number(actions[i]);
    }
  }
  // console.log(answer);
  res.send(200, answer);
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});