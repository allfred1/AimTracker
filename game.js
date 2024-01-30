// был сделан рефакторинг кода, было ошибки и моменты даже когда игра даже не запускалась ;(
const btn = document.querySelector(".btn"),
  timeOut = document.querySelector(".time"),
  gameBlock = document.querySelector(".game__block");

let score = 0,
  gameTime = 0,
  interval = 0,
  input = document.querySelector(".input");

btn.addEventListener("click", () => {
  if (!input.value) {
    alert("Введите время!");
  } else {
    gameTime = Number(input.value);
    input.value = "";
    const result = document.querySelector(".result");
    if (result) {
      result.style.display = "none";
    }
    clearInterval(interval);
    score = 0;
    start();
  }
});

function start() {
  timeOut.innerHTML = gameTime;
  interval = setInterval(() => decrease(), 1000);
  CreateBall();
} // запуск игры
function decrease() {
  if (gameTime === 0) {
    end();
  } else {
    let currentTime = --gameTime;
    timeOut.innerHTML = currentTime;
  }
}
function end() {
  gameBlock.innerHTML = `<h2 class="result">Вы набрали ${score} баллов</h2>`;
} // завершение
function CreateBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  CustomizeBall(ball);
  gameBlock.append(ball);
} // создание шара
function CustomizeBall(ball) {
  let size = Math.floor(Math.random() * (100 - 20 + 1) + 20);
  let form = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "white",
  ];
  if (form === 1) {
    ball.style.clipPath = "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)";
  } else if (form === 2) {
    ball.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
  } else if (form === 3) {
    ball.style.borderRadius = "50%";
  }

  let randomColor = colors[Math.floor(Math.random() * colors.length)];
  ball.style.background = randomColor;

  let { width, height } = gameBlock.getBoundingClientRect();
  let leftValue = Math.floor(Math.random() * (width - size));
  let topValue = Math.floor(Math.random() * (height - size));
  ball.style.width = size + "px";
  ball.style.height = size + "px";
  ball.style.left = leftValue + "px";
  ball.style.top = topValue + "px";
} // настройки шара

gameBlock.addEventListener("click", (event) => {
  if (event.target.classList.contains("ball")) {
    score++;
    event.target.remove();
    CreateBall();
  }
});
function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
