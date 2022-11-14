const productList = document.querySelector('#products');

const xhr = new XMLHttpRequest();
console.log(xhr);

xhr.addEventListener('load', function () {
  if (xhr.status === 200) {
    productList.innerHTML = '';
    const products = JSON.parse(xhr.response);

    products.forEach((product) => {
      const item = document.createElement('li');
      item.classList.add('items');
      item.textContent = product.title;
      productList.append(item);
    });
  }
});

xhr.addEventListener('error', function () {
  console.error(`Ошибка загрузки ${xhr.statusText}`);
});

xhr.open('GET', 'https://fakestoreapi.com/products');

xhr.send();
