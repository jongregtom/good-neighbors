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

  // User.sync({force: true}).then(() => {
//     // Table created
//     return User.create({
//         name: 'Jon',
//         email: 'Hancock'
//     });
// });

// User.findAll().then(users => {
//     //console.log('users', users)
// })

  module.exports = {
      addUserToDB: addUserToDB
  }