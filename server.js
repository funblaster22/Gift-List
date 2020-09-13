// NOTE: restart server when accounts.json changes externally
const express = require('express');
const requestIp = require('request-ip');
const fs = require('fs');

const app = express();
var accounts = JSON.parse(fs.readFileSync(__dirname + '/accounts.json'));

// Serve the static files from the React app
app.use(express.static(__dirname + '/build'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// For getting client's IP address
app.use(requestIp.mw());


app.post('/api/codeExists', (req, res) => {
  if (req.body.code in accounts)
    res.json(true);
  else
    res.json(false);
});

function validateInputs(req, res) {
  let family = accounts[req.body.code];
  if (!family) {
    res.status(404);
    res.json({"error": `Family '${req.body.code}' does not exist`});
  } else if (family._ip !== req.clientIp) {
    // Security measure to prevent random people from messing with gift list
    res.status(403);
    res.json({"error": "Your IP address is not approved to access this account"});
  }
  else
    return true

  return false
}

function commitAccountFile() {
  fs.writeFileSync(__dirname + '/accounts.json', JSON.stringify(accounts, null, 2), 'utf-8');
}

app.post('/api/getFamily', (req, res) => {
  const family = accounts[req.body.code];
  if (validateInputs(req, res))
    res.json(family.people);
});

app.post('/api/addGift', (req, res) => {
  // TODO: better error handling (for: 'to' & 'gifts' fields)
  // TODO: handle merge conflicts (if 2 people using simultaneously)
  if (validateInputs(req, res) && req.body.gifts.length > 0) {
    accounts[req.body.code].people[req.body.to] = req.body.gifts;
    commitAccountFile()
  }
  res.json('{}');
});


app.post('/api/new', (req, res) => {
  if (req.body.code in accounts) {
    res.status(400);
    res.json({error: "That account name exists, try again"});
    // TODO: maybe ban IP?
    return;
  }
  else if (req.body.code.length < 8) {
    res.status(400);
    res.json({error: "Family code must be at least 8 characters"});
    return;
  }
  accounts[req.body.code] = { "_ip": req.clientIp, people: {} };
  accounts[req.body.code].people[req.body.name] = [];
  commitAccountFile()
  res.redirect('/');
});

app.post('/api/login', (req, res) => {
  let family = accounts[req.body.code].people;
  if (validateInputs(req, res)) {
    if (!(req.body.name in family)) {
      family[req.body.name] = [];
      commitAccountFile()
    }
    res.redirect('/');
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
