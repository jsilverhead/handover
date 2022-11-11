const namedCities = [];
let getWord = [];
let playerAnswer = ''; // Ответ игрока
let botAnswer = ''; // Ответ компьютера
let lastLetter = '';
let playerScore = 0; // Очки игрока за названные города
let botScore = 0; // Очки бота за названные города
let isStart = true; // Определяем старт игры
let answerFirstLetter = '';
let isGameOver = false;

function playerTurn() {
  if (!isGameOver) {
    if (isStart) {
      // если старт игры - задаём город на любую букву
      playerAnswer = prompt(`Назови город на любую букву`);
      if (playerAnswer) {
        getWord = Array.from(playerAnswer);
        lastLetter = getWord.pop();
        if (lastLetter === 'ь' || lastLetter === 'й')
          lastLetter = getWord.pop();
        answerFirstLetter = lastLetter;
        playerCheck(playerAnswer);
      } else playerCheck();
    } else {
      playerAnswer = prompt(`Назови город на ${lastLetter}`);
      if (playerAnswer) {
        getWord = Array.from(playerAnswer);
        answerFirstLetter = getWord.shift();
        playerCheck(playerAnswer);
      } else playerCheck();
    }
  }
  return;
}

function playerCheck(playerAnswer) {
  if (!playerAnswer) {
    let closeGame = confirm(`Завершить игру?`);
    if (closeGame) {
      gameOver();
    } else {
      playerTurn();
    }
  } else if (namedCities.includes(playerAnswer)) {
    alert(`Такой город уже был указан!`); // Злимсо
    playerTurn(); // Возвращаемся к вопросу о городе
  } else if (!cities.includes(playerAnswer)) {
    alert(`Это не название города!`); // Злимсо
    playerTurn(); // Возвращаемся к вопросу о городе
  } else if (answerFirstLetter !== lastLetter) {
    alert(`Нужно назвать город на ${lastLetter}`); // Злимсо
    playerTurn(); // Возвращаемся к вопросу о городе
  } else {
    if (isStart) {
      isStart = false;
      getWord.length = 0; // Сбрасываем массив
      playerScore++; // Добавляем очко игроку
      saveCity(playerAnswer); // Идём сохранять ответ раз всё окей
      botTurn();
    } else {
      lastLetter = getWord.pop(); // Узнаём последнюю букву
      if (lastLetter === 'ь' || lastLetter === 'й') lastLetter = getWord.pop();
      getWord.length = 0; // Сбрасываем массив
      playerScore++; // Добавляем очко игроку
      saveCity(playerAnswer); // Идём сохранять ответ раз всё окей
      botTurn();
    }
  }
  return;
}

function botTurn() {
  for (let city of cities) {
    botAnswer = city;
    getWord = Array.from(botAnswer);
    answerFirstLetter = getWord.shift();
    if (answerFirstLetter === lastLetter) {
      alert(`Ответ бота: ${botAnswer}`);
      botScore++;
      lastLetter = getWord.pop();
      if (lastLetter === 'ь' || lastLetter === 'й') lastLetter = getWord.pop();
      getWord.length = 0;
      saveCity(botAnswer);
      playerTurn();
    } else if (cities.length === 0) {
      alert(`Бот сдаётся`);
      gameOver();
      break;
    } else if (isGameOver) break;
  }

  return;
}

function saveCity(playerAnswer, botAnswer) {
  namedCities.push(playerAnswer, botAnswer);
  getIndex = cities.indexOf(playerAnswer, botAnswer); //получить индекс города
  cities.splice(getIndex, 1); // удаляем из массива названный город
}

function gameOver() {
  alert(
    `Игра окончена.\nВаш счёт: ${playerScore}\nСчёт компьютера: ${botScore}`
  );
  return (isGameOver = true);
}

playerTurn();
