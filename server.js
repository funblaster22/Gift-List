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


app.post('/api/new', (req, res) => {
    if (req.body.code in accounts) {
      res.send("What are you doing here? That account name exists, try again");
      // TODO: maybe ban IP?
      return;
    }
    if (req.body.name == "_ip") {
      res.send("hmm, '_ip' is an interesting name...");
      return;
    }
    accounts[req.body.code] = { "_ip": req.clientIp };
    accounts[req.body.code][req.body.name] = [];
    fs.writeFileSync(__dirname + '/accounts.json', JSON.stringify(accounts, null, 2), 'utf-8');
    res.redirect('/');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
