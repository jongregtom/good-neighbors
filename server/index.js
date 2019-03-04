var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

var app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//serve React build file only in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/../build')));
    // Handle React routing, return all requests to React app
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../build', 'index.html'));
    });
}

var schema = buildSchema(`
  type Query {
    hello: String,
    getDie(numSides: Int): RandomDie
  }
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
`);

class RandomDie {
    constructor(numSides) {
      this.numSides = numSides;
    }
  
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
  
    roll({numRolls}) {
      var output = [];
      for (var i = 0; i < numRolls; i++) {
        output.push(this.rollOnce());
      }
      return output;
    }
}
var root = {
    hello: () => {
      return 'Hello world!';
    },
    getDie: function ({numSides}) {
        return new RandomDie(numSides || 6);
      }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));


app.listen(port, function() {
    console.log(`listening on port ${port}!`);
});