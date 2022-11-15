const API_URL = 'https://fakestoreapi.com';

function createRequest(method, url, body) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      resolve(xhr);
    });
    xhr.addEventListener('error', function () {
      reject(xhr);
    });

    xhr.open(method, url);

    if (body) xhr.send(body);
    else xhr.send();
  });
}

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
    return createRequest('POST', `${API_URL}/carts/5`, body);
  }

  getList(params = {}) {
    const queryparams = new URLSearchParams(params);
    return createRequest(
      'GET',
      `${API_URL}/products?${queryparams.toString()}`,
      null
    );
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
    .then((xhr) => {
      if (xhr.status === 200) {
        const products = JSON.parse(xhr.response);

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
      }
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
