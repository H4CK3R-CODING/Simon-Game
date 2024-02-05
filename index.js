let h2 = document.querySelector("h2");

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let level = 0;
let highScore = 0;
let started = false;

document.addEventListener("keypress", (event) => {
  if (started == false) {
    levelUp();
    started = true;
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // random button choose
  let btnInd = Math.floor(Math.random()*3);
  let btnClass = btns[btnInd];
  gameSeq.push(btnClass);
  let btn = document.querySelector(`.${btnClass}`);
  // console.log(btnInd);
  // console.log(btnClass);
  // console.log(btn);
  GameFlash(btn);
}

function GameFlash(btn) {
  btn.classList.add("game_flash");
  setTimeout(function () {
    btn.classList.remove("game_flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("user_flash");
  setTimeout(function () {
    btn.classList.remove("user_flash");
  }, 250);
}

function checkAns(idx){
  if(gameSeq[idx] === userSeq[idx]){
    if(userSeq.length == gameSeq.length){
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  }
  else{
    if(highScore < level){
      highScore = level;
    }
    h2.innerHTML = `Game Over! <br/> Your Score is ${level} <br/> Highest Score is ${highScore} <br/> Press Any Key to Start`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPressed(){
  let btn = this;
  let btnColor = btn.getAttribute("id");
  userSeq.push(btnColor);
  userFlash(btn);
  checkAns(userSeq.length-1);
}


let allBtn = document.querySelectorAll(".btn");
for(let btn of allBtn){
  btn.addEventListener("click",btnPressed)
}


function reset(){
  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];
}