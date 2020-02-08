const body = document.querySelector("body");

const IMG_NUMBER = 8;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function getRandom() {
  return Math.floor(Math.random() * IMG_NUMBER) + 1;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
