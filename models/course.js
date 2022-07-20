const path = require('path')
const fs = require('fs')
const uuid = require('uuid')
const PATH = path.join(__dirname, '..', 'data', 'courses.json')

class Course{
  constructor(title, price, img) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuid.v4()
  }

  toJson() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    }
  }

  static async getAll() {
    return new Promise((res, rej) => {
      fs.readFile(PATH, 'utf-8', (err, data) => {
        if (err) {
          rej(err)
        } else {
          res(JSON.parse(data))
        }
      })
    })
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJson())
    new Promise((res, rej) => {
      fs.writeFile(PATH, JSON.stringify(courses), err => {
        if (err) {
          rej(err)
        } else {
          res()
        }
       })
    })
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(c => c.id === id)
  }

  static async update(course) {
   const courses = await Course.getAll()
   const idx = courses.findIndex(c => c.id === course.id)
   courses[idx] = course
   return new Promise((res, rej) => {
     fs.writeFile(PATH, JSON.stringify(courses), err => {
      if (err) {
        rej(err)
      } else {
        res()
      }
     })
   })
  }

}

module.exports = Course