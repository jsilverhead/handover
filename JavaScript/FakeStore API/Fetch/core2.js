const API_URL = 'https://fakestoreapi.com';

class API {
  addToCart(productID) {
    const body = JSON.stringify({
      userID: 1,
      date: '2022-14-11',
      products: [
        {
          productID,
          quantity: 1,
        },
      ],
    });
    return fetch(`${API_URL}/carts/5`, {
      method: 'POST',
      body,
    });
  }

  getList(params = {}) {
    const queryparams = new URLSearchParams(params);
    return fetch(`${API_URL}/products?${queryparams.toString()}`);
  }
}

const api = new API();

function handleError() {
  alert('Ошибка');
}

window.addEventListener('load', function () {
  const itemlist = this.document.querySelector('#products');

  api
    .getList({ limit: 10 })
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const item = document.createElement('li');
        const toCart = document.createElement('button');
        item.classList.add('items');
        toCart.classList.add('toCart');
        item.textContent = `${product.title} `;
        toCart.textContent = 'Добавить в корзину';
        toCart.setAttribute('data-product-id', product.id);
        itemlist.append(item);
        item.append(toCart);
      });
    })
    .catch(handleError);

  itemlist.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.disabled = 'true';
      api
        .addToCart(e.target.getAttribute('data-product-id'))
        .then(() => {
          e.target.textContent = 'Добавлено';
        })
        .catch(() => {
          e.target.disabled = 'false';
        });
    }
  });
});
