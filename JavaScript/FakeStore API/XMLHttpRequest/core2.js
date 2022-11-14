const API_URL = 'https://fakestoreapi.com';

function createRequest(
  method,
  url,
  body,
  onSucces = () => {},
  onError = () => {}
) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    onSucces(xhr);
  });
  xhr.addEventListener('error', function () {
    onError(xhr);
  });

  xhr.open(method, url);

  if (body) xhr.send(body);
  else xhr.send();

  return xhr;
}

class API {
  addToCart(productID, onSucces, onError) {
    const body = JSON.stringify({
      userID: 3,
      date: '2022-14-11',
      products: [
        {
          productID,
          quantity: 1,
        },
      ],
    });
    createRequest('POST', `${API_URL}/carts/7`, body, onSucces, onError);
  }

  getList(params = {}, onSucces, onError) {
    const queryparams = new URLSearchParams(params);
    createRequest(
      'GET',
      `${API_URL}/products?${queryparams.toString()}`,
      null,
      onSucces,
      onError
    );
  }
}

const api = new API();

function handleError() {
  alert('Ошибка');
}

window.addEventListener('load', function () {
  const itemlist = this.document.querySelector('#products');

  api.getList(
    { limit: 10 },
    function (xhr) {
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
    },
    handleError
  );

  itemlist.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.disabled = 'true';
      api.addToCart(
        e.target.getAttribute('data-product-id'),
        function () {
          e.target.textContent = 'Добавлено';
        },
        function () {
          e.target.disabled = 'false';
        }
      );
    }
  });
});
