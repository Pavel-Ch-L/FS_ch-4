const {Router} = require('express')
const router = Router()
const Cart = require('../models/cart')

router.get('/', async(req, res) =>{
  const cart = await Cart.fetch()
  res.render('cart', {
    tile: 'Корзина',
    isCart: true,
    cart
  })
})

router.post('/add', async (req, res) => {
  await Cart.add(req.body.id)
  res.redirect('/cart')
})

router.delete('/remove/:id', async(req, res) => {
  const cart = await Cart.remove(req.params.id)
  res.json(cart)
})

module.exports = router