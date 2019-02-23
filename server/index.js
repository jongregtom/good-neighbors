var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

var app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://good-neighbors.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'A02LrzuM7sqbnPmk4XFqG5-b94mK>',
    issuer: `https://good-neighbors.auth0.com/`,
    algorithms: ['RS256']
  });

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/../build')));
    // Handle React routing, return all requests to React app
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../build', 'index.html'));
    });
}

app.get('/check', (req, res, next) => {
    res.send('hi');
    next();
})


app.listen(port, function() {
    console.log(`listening on port ${port}!`);
});