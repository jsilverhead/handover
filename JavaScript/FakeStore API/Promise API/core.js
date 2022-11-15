function createRequest(method, url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      resolve(xhr);
    });
    xhr.addEventListener('error', function () {
      reject(xhr);
    });
    xhr.open(method, url);

    xhr.send();
  });
}

const request = createRequest('GET', 'https://fakestoreapi.com/products');

request
  .then(function (xhr) {
    const list = document.querySelector('#products');
    const products = JSON.parse(xhr.response);
    products.forEach((product) => {
      const item = document.createElement('li');
      item.classList.add('items');
      item.textContent = product.title;
      list.append(item);
    });
  })

  .catch(function (xhr) {
    alert(`Ошибка. Статус: ${xhr.status}`);
  });
