const {Schema, model} = require('mongoose')
const mongooseLeanIid = require('mongoose-lean-id')

const user = new Schema({
  email: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          require: true,
          default: 1
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          require: true
        }
      }
    ]
  }
})

user.methods.addToCart = function (course) {
  const clonedItems = [...this.cart.items]
  const idx = clonedItems.findIndex(c => c.courseId.toString() === course._id.toString())
  if (idx >= 0) {
    clonedItems[idx].count++
  } else {
    clonedItems.push({
      courseId: course._id,
      count: 1
    })
  }
  this.cart = {items: clonedItems}
  return this.save()
}

user.plugin(mongooseLeanIid)

module.exports = model('User', user)