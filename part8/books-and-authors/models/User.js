const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   username: String,
   id: String,
   favoriteGenre: {
      type: String,
   }
})

module.exports = mongoose.model('User', schema)