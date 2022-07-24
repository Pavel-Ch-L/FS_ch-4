const {Schema, model} = require('mongoose')
const mongooseLeanId = require('mongoose-lean-id')

const course = new Schema({
  title: {
    type: String,
    require
  },
  price: {
    type: Number,
    require
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

course.plugin(mongooseLeanId)

module.exports = model('Course', course)