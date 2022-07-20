const path = require('path')
const fs = require('fs')
const Course = require('./course')
const PATH = path.join(path.dirname(require.main.filename), 'data', 'cart.json')

class Cart{

  static async add(id) {
    const cart = await Cart.fetch()
    const course = await Course.getById(id)
    const idx = cart.courses.findIndex(c => c.id === id)
    if(cart.courses[idx]) {
      cart.courses[idx].count++
    } else {
      course.count = 1
      cart.courses.push(course)
    }
    cart.price += +course.price
    return new Promise((resolve, reject) => {
      fs.writeFile(PATH, JSON.stringify(cart), err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(PATH, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
        }
      })
    })
  }

  static async remove(id) {
    const cart = await Cart.fetch()
    const idx = cart.courses.findIndex(c => c.id === id)
    const course = cart.courses[idx]
    if (course.count === 1) {
      cart.courses = cart.courses.filter(c => c.id !== id)
    } else {
      cart.courses[idx].count--
    }
    cart.price -= +course.price
    return new Promise((resolve, reject) => {
      fs.writeFile(PATH, JSON.stringify(cart), err => {
        if (err) {
          reject(err)
        } else {
          resolve(cart)
        }
      })
    })
  }

}

module.exports = Cart