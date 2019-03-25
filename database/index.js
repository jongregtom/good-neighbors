const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://jonthomas@localhost:5432/postgres');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    picture: {
        type: Sequelize.STRING
    }
  })

  const Request = sequelize.define('request', {
      id: {
          type: Sequelize.STRING,
          primaryKey: true
      },
      subject: {
          type: Sequelize.STRING
      },
      request: {
          type: Sequelize.STRING
      },
      location: {
          type: Sequelize.STRING
      }
  })

Request.belongsTo(User);

  //add user to DB if doesn't already exist
let addUserToDB = (user, callback) => {
User.sync().then(() => {
// Table created
    User.findOrCreate({where: {id: user.id}, defaults: {name: user.name, email: user.email, picture: user.picture, firstName: user.firstName}})
    .spread((user, created) => {
        callback(user);
    })
});
}

let addRequestToDB = (request, callback) => {
    Request.sync().then(() => {
        Request.create({id: request.id, subject: request.subject, request: request.request, location: request.location, userId: request.userId})
        .then((request) => {
            callback(request)
        })
    })
}

let getRequestsFromDB = (callback) => {
    Request.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: ['id', 'subject', 'request', 'location', 'userId', 'createdAt']
    }).then(requests => {
        callback(requests)
    })
}

let getUserFromDB = (id, callback) => {
    User.findAll({
        where: {
            id: id
        }
    //returns user's full name
    }).then(user => callback(user[0]))
}
// User.findAll().then(users => {
//     //console.log('users', users)
// })

  module.exports = {
      addUserToDB: addUserToDB,
      addRequestToDB: addRequestToDB,
      getRequestsFromDB: getRequestsFromDB,
      getUserFromDB: getUserFromDB 
  }