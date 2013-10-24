var mongo = require('mongoskin')

var MONGODB_URL = process.env.MONGODB_URL || "mongo://localhost:27017/node-ci-testdb" 


module.exports = {

  userExists: function(usernameOrEmail, cb) {

    var db = mongo.db(MONGODB_URL, {safe:true})

    db.collection('users').findOne({ $or : [
      {username: usernameOrEmail},
      {email: usernameOrEmail}]
    }, function(err, user) {
      if (err || !user) {
        return cb(new Error("user not found"), null)
      }

      return cb(null, user)
    })

  }
}
