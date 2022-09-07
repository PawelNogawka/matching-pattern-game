const gameColors = ["red", "blue", "green", "yellow"];
const message = document.querySelector(".message");
const gamearea = document.querySelector(".gamearea");
const button = document.querySelector("button");
let gameClicks = [];
let userClicks = [];
let inPlay = false;
let playNum = 2;

window.addEventListener("load", setup);
button.addEventListener("click", function (e) {
  this.disabled = true;
  gameClicks = [];
  userClicks = [];
  messager("Match correct");
  setRandomSequences(playNum);
});

function setup() {
  for (let i = 0; i < 4; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.color = gameColors[i];
    box.style.backgroundColor = box.color;

    box.style.opacity = "0.5";
    box.addEventListener("click", checkAnswer);

    gamearea.appendChild(box);
  }
}

function checkAnswer(e) {
  if (inPlay) {
    let el = e.target;
     el.style.opacity = "1";

    setTimeout(function () {
      el.style.opacity = "0.5";
    }, 500);

    userClicks.push(el.color);

    if (gameClicks.length === userClicks.length) {
      inPlay = false;
      gameOver();
    }
  }
}

function setRandomSequences(num) {
  let squares = document.querySelectorAll(".box");

  num--;

  if (num < 0) {
    inPlay = true;
    return;
  }

  let ran = Math.floor(Math.random() * gameColors.length);

  gameClicks.push(gameColors[ran]);
  squares[ran].style.opacity = "1";

  setTimeout(function () {
    squares[ran].style.opacity = "0.5";
    setTimeout(function () {
      setRandomSequences(num);
    }, 100);
  }, 500);
}

function gameOver() {
  button.disabled = false;
  if (gameClicks.toString() === userClicks.toString()) {
    playNum++;
    messager(
      "Correct! Press the start button to go to the next level" +
        "-" +
        (playNum - 1)
    );
  } else {
    playNum = 2;
    messager("Wrong answer! Press the start button to try again");
  }
}

function messager(mes) {
  message.textContent = mes;
}
