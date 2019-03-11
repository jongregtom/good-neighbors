var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { addUserToDB, addRequestToDB, getRequestsFromDB } = require('../database/index.js');
const requests = require('../src/dummyData.js');

var app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const checkJwt = jwt({
//     secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://good-neighbors.auth0.com/.well-known/jwks.json`
//     }),
  
//     // Validate the audience and the issuer.
//     audience: 'A02LrzuM7sqbnPmk4XFqG5-b94mK>',
//     issuer: `https://good-neighbors.auth0.com/`,
//     algorithms: ['RS256']
// });

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
  input RequestInput {
    id: String
    subject: String
    request: String
    location: String
    userId: String
  }
  type Request {
    id: String
    subject: String
    request: String
    location: String
    userId: String
  }
  type Query {
    hello: String
    getRequests: [Request]
  }
  type Mutation {
    addUser(input: UserInput): User
    addRequest(input: RequestInput): Request
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

class Request {
    constructor({id, subject, request, location, userId}) {
        this.id = id;
        this.subject = subject;
        this.request = request;
        this.location = location;
        this.createdAt = this.createdAt;
        this.userId = userId;
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
    },
    addRequest: ({input}) => {
        input.id = require('crypto').randomBytes(10).toString('hex');
        return new Promise((resolve, reject) => {
            addRequestToDB(input, (res) => {
                resolve(res.dataValues)
            })
        })
        .then((result) => new Request(result))
    },
    getRequests: () => {
        return new Promise((resolve, reject) => {
          getRequestsFromDB(res => {
            res.map((request) => {
              new Request(request.dataValues);
            })
            resolve(res)
          })
        })
        .then(res => res)
        //return requests.requests

    }
};

getRequestsFromDB(result => {
  // let mapped = result.map(result => {
    
  // })
  console.log(result.map((res) => res.dataValues))
})

app.use('/graphql', bodyParser.json(), graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, function() {
    console.log(`listening on port ${port}!`);
});