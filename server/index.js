var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { addUserToDB } = require('../database/index.js');

var app = express();
const port = process.env.PORT || 8080;

app.use(cors());
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

//graphQL Schema
var schema = buildSchema(`
  input UserInput {
    id: String
    name: String
    picture: String
    email: String
    firstName: String
  }
  type User {
    id: String
    name: String
    picture: String
    email: String
    firstName: String
  }
  type Query {
    hello: String
  }
  type Mutation {
    addUser(input: UserInput): User
  }
`);

class User {
    constructor({id, name, email, picture, firstName}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.firstName = firstName;
    }
}

var root = {
    addUser: ({input}) => {
      return new Promise((resolve, reject) => {

        addUserToDB(input, (res) => {
            resolve(res.dataValues)
        })
      })
      .then((result) => new User(result))
    }
};

app.use('/graphql', bodyParser.json(), graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, function() {
    console.log(`listening on port ${port}!`);
});