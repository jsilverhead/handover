const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const handsStart = 180;
const currentDate = new Date();
let currentTime =
  currentDate.getHours() +
  ':' +
  currentDate.getMinutes() +
  ':' +
  currentDate.getSeconds(); // хочу потом вывести под часами

function checkTime() {
  // узнаём текущее время
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  let currentSeconds = currentDate.getSeconds();

  // HOURS
  if (currentHour < 12) {
    let handsmove = 0;
    handsmove = currentHour * 30;
    hours.style.transform = `rotate(-${handsmove}deg) translateY(-50px)`;
  } else if (currentHour > 12) {
    let handsmove = 0;
    handsmove = 180 - (currentHour - 12) * 30;
    hours.style.transform = `rotate(-${handsmove}deg) translateY(50px)`;
  } else hours.style.transform = `rotate(${handsStart}deg) translateY(50px)`;

  // MINUTES
  if (currentMinute !== 0 || currentMinute !== 60) {
    let handsmove = 0;
    handsmove = currentMinute * 6;
    minutes.style.transform = `rotate(${handsmove}deg) translateY(-50px)`;
  } else minutes.style.transform = `rotate(${handsStart}deg) translateY(50px)`;

  // SECONDS
  if (currentSeconds !== 0 || currentSeconds !== 60) {
    let handsmove = 0;
    handsmove = currentSeconds * 6;
    seconds.style.transform = `rotate(${handsmove}deg) translateY(-50px)`;
  } else seconds.style.transform = `rotate(${handsStart}deg) translateY(50px)`;

  moveHands(currentHour, currentMinute, currentSeconds);
}

function moveHands(currentHour, currentMinute, currentSeconds) {
  setInterval(() => {
    currentSeconds++;
    if (currentSeconds !== 0 || currentSeconds !== 60) {
      let handsmove = 0;
      handsmove = currentSeconds * 6;
      seconds.style.transform = `rotate(${handsmove}deg) translateY(-50px)`;
    } else
      seconds.style.transform = `rotate(${handsStart}deg) translateY(50px)`;

    if (currentSeconds === 60) {
      console.warn(`new minute`);
      currentMinute++;
      let handsmove = 0;
      handsmove = currentMinute * 6;
      minutes.style.transform = `rotate(${handsmove}deg) translateY(-50px)`;
      currentSeconds = 0;
    }

    if (currentMinute === 60) {
      currentHour++;
      if (currentHour < 12) {
        let handsmove = 0;
        handsmove = currentHour * 30;
        hours.style.transform = `rotate(-${handsmove}deg) translateY(-50px)`;
      } else if (currentHour > 12) {
        let handsmove = 0;
        handsmove = 180 - (currentHour - 12) * 30;
        hours.style.transform = `rotate(-${handsmove}deg) translateY(50px)`;
      } else
        hours.style.transform = `rotate(${handsStart}deg) translateY(50px)`;
      currentMinute = 0;
    }
  }, 1000);
}

checkTime();
