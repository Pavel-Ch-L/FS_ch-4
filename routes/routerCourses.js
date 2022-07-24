const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async(req, res) => {
 const courses = await Course.find().lean().populate('userId', 'email name')
 res.render('courses', {
  title: 'Курсы',
  isCourses: true,
  courses
 })
})

router.get('/:id', async(req, res) => {
  const course = await Course.findById(req.params.id).lean()
  res.render('course', {
    layout: 'empty',
    title: course.title,
    course
  })
})

router.get('/:id/edit', async(req, res) => {
  if(req.query.allow === 'true') {
    const course = await Course.findById(req.params.id).lean()
    res.render('course-edit', {
      title: 'Редактировать курс',
      course
    })
  } else {
    res.redirect('/')
  }
  
})

router.post('/edit', async(req, res) => {
  const {id} = req.body
  delete req.body.id
  await Course.findByIdAndUpdate(id, req.body).lean()
  res.redirect('/courses')
})

router.post('/remove', async(req, res) => {
  await Course.findByIdAndRemove({
    _id: req.body.id
  })
  res.redirect('/courses')
})

module.exports = router