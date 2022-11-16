const API_URL = 'https://fakestoreapi.com';

class API {
  async addToCart(productID) {
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
    await fetch(`${API_URL}/carts/5`, {
      method: 'POST',
      body,
    });
  }

  async getList(params = {}) {
    const queryparams = new URLSearchParams(params);
    const response = await fetch(
      `${API_URL}/products?${queryparams.toString()}`
    );
    const products = await response.json();

    return products;
  }
}

const api = new API();

function handleError(error) {
  alert('Ошибка:', error);
}

async function renderList() {
  try {
    const itemlist = document.querySelector('#products');
    const products = await api.getList({ limit: 10 });

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
  } catch (error) {
    handleError(error);
  }
}

window.addEventListener('load', function () {
  renderList();

  const itemlist = this.document.querySelector('#products');

  itemlist.addEventListener('click', async function (e) {
    if (e.target.tagName === 'BUTTON') {
      try {
        e.target.disabled = 'true';
        await api.addToCart(e.target.getAttribute('data-product-id'));
        e.target.textContent = 'Добавлено';
      } catch {
        e.target.disabled = 'false';
      }
    }
  });
});
