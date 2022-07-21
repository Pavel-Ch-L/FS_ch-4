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
  img: String
})

course.plugin(mongooseLeanId)

module.exports = model('Course', course)