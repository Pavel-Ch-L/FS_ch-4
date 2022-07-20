const toCurrency  = price =>{
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'rub'
  }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent)
})

const $cart = document.querySelector('.cart')
if($cart) {
  $cart.addEventListener('click', event => {
    if(event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      fetch('/cart/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(cart => {
          if(cart.courses.length) {
            const html = cart.courses.map(c => {
              return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td><button class="btn js-remove" data-id="${c.id}">Удалить</button></td>
              </tr>
              `
            }).join(' ')
            document.querySelector('tbody').innerHTML = html
            document.querySelector('.price').innerText = toCurrency(cart.price)
          } else {
            $cart.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}