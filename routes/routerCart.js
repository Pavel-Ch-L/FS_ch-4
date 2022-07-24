const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async(req, res) =>{
  const cart = await Cart.fetch()
  res.render('cart', {
    tile: 'Корзина',
    isCart: true,
    cart
  })
})

router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id)
  await req.user.addToCart(course)
  res.redirect('/cart')
})

router.delete('/remove/:id', async(req, res) => {
  const cart = await Cart.remove(req.params.id)
  res.json(cart)
})

module.exports = router