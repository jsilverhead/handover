const textMeter = document.querySelector('#meter');
const buhbar = document.querySelector('#buhbar');
const alerts = document.querySelector('#alerts');
const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const glass = document.querySelector('i');

let drink = 0; //количество выпитых бокалов
let siz = 0; //размер прогресс-бара

function buhyes() {
  //если выбрать "да"
  if (drink <= 4) {
    drink++;
    textMeter.textContent = `Выпито: ${drink / 2} л`; //добавляем 0.5 литров
    siz += 80; // увеличиваем размер прогресс-бара
    buhbar.style.width = siz + 'px';
  }
  if (drink === 3) {
    //ты пьяна, иди домой
    buhbar.style.backgroundColor = 'blue';
  }
  if (drink === 4) {
    //Больше пить не можно
    alerts.textContent = 'Ты куда?';
  }
  if (drink === 5) {
    //Аня, ты перепила
    buhbar.style.backgroundColor = 'red';
    alerts.textContent = 'Пока!';
    yesBtn.style.left = Math.floor(Math.random() * 400) + 'px';
    yesBtn.style.top = Math.floor(Math.random() * 400) + 'px';

    yesBtn.addEventListener('mouseover', () => {
      yesBtn.style.left = Math.floor(Math.random() * 400) + 'px';
      yesBtn.style.top = Math.floor(Math.random() * 400) + 'px';
    });
  }
}

function buhno() {
  alerts.textContent = 'Молодец!';

  let seconds = 0;

  const disapear = setInterval(() => {
    seconds++;
    if (seconds === 2) {
      alerts.textContent = '';
      clearInterval(disapear);
    }
  }, 1000);
}

function glassRotate() {
  const hopadrink = glass.animate(
    [
      { transform: 'rotate(0)' },
      { transform: 'rotate(45deg)' },
      { transform: 'rotate(0)' },
      { transform: 'rotate(60deg)' },
      { transform: 'rotate(0)' },
    ],
    {
      duration: 700,
    }
  );
}

yesBtn.addEventListener('click', buhyes);
yesBtn.addEventListener('mouseenter', glassRotate);
noBtn.addEventListener('click', buhno);
