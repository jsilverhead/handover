// elements
const orders = document.querySelectorAll('[name="order"]'); // товары
const firstname = document.querySelector('#firstname'); // имя
const lastname = document.querySelector('#lastname'); // фамилия
const numbers = document.querySelectorAll('.numbers'); // единицы товаров
const result = document.querySelector('#result'); // сумма всех операций
const btn = document.querySelector('#btn'); // кнопка заказа

let orderID; // id чекбокса
let counting = 0; // сумма всех товаров

const items = {
  1: {
    name: 'espresso',
    cost: 80,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  2: {
    name: 'americano',
    cost: 110,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  3: {
    name: 'latte',
    cost: 120,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  4: {
    name: 'cappucino',
    cost: 90,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  5: {
    name: 'chocolate',
    cost: 80,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  6: {
    name: 'blueberry',
    cost: 90,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
  7: {
    name: 'appletart',
    cost: 100,
    quantity: 0,
    itemsum: function () {
      return this.cost * this.quantity;
    },
  },
};

orders.forEach((element) => {
  element.addEventListener('change', function () {
    // "слушаем чебоксы"
    if (element.checked) {
      // чекбокс нажат
      orderID = parseInt(element.id); // узнаём id соседнего инпута
      items[orderID].quantity = 1; // прописываем количество выбранного товара

      for (let number of numbers) {
        if (number.id === `order${orderID}-num`) number.value = 1; // * если выбран товар > количество товара = 1
      }
      results();
    } else {
      // чекбокс отжат
      orderID = parseInt(element.id);
      items[orderID].quantity = 0;

      for (let number of numbers) {
        if (number.id === `order${orderID}-num`) number.value = 0;
      }
      results();
    }
  });
});

numbers.forEach((element) => {
  element.addEventListener('change', function () {
    // "слушаем инпуты"
    if (element.value > 0) {
      // добавили айтем через инпут
      element.value = parseInt(this.value); // * если значение 01 или дробное
      orderID = parseInt(element.dataset.check); // узнаём ID сосднего чекбокса
      items[orderID].quantity = element.value; // прописываем в товары - единицу товаров

      for (let order of orders) {
        if (order.id === `${orderID}order`) order.checked = true; // если инпут > 0 - соседний чекбокс нажимается
      }
      results();
    } else {
      // убрали айтем
      element.value = 0; // * на случай если написали число < 0
      orderID = parseInt(element.dataset.check);
      items[orderID].quantity = element.value;

      for (let order of orders) {
        if (order.id === `${orderID}order`) order.checked = false;
      }
      results();
    }
  });
});

function results() {
  counting = 0;
  for (let key of Object.keys(items)) {
    counting += items[key].itemsum(); // считаем содержимое объекта items
  }

  result.textContent = counting;
}

btn.addEventListener('click', function () {
  alert(
    `Заказчик: ${firstname.value} ${lastname.value}\nСумма заказа: ${counting}р.`
  );
});
