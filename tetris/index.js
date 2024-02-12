const gridContainer = document.querySelector('#grid-container');
const grids = document.querySelectorAll('.grid');

const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');

const WIDTH = 10;

const ㄱ블록 = [
  [ 1, WIDTH + 1, WIDTH * 2 + 1, 2], // rotate 0 degree
  [ WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 2], // rotate 90 degree
  [1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 2], // rotate 180 degree
  [WIDTH, WIDTH * 2, WIDTH * 2 + 1, WIDTH * 2 + 2], // rotate 270 degree
]
const ㄹ블록 = [
  [ 1, 2, WIDTH, WIDTH + 1], // rotate 0 degree
  [ 1, WIDTH, WIDTH + 1, WIDTH + 2], // rotate 90 degree
  [ 1, 2, WIDTH, WIDTH + 1], // rotate 180 degree
  [ 1, WIDTH, WIDTH + 1, WIDTH + 2], // rotate 270 degree
]
const ㅗ블록 = [
  [ 1, WIDTH, WIDTH + 1, WIDTH + 2], // rotate 0 degree
  [ 1, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1], // rotate 90 degree
  [ WIDTH, WIDTH + 1, WIDTH + 2, WIDTH * 2 + 1], // rotate 180 degree
  [ 1, WIDTH, WIDTH + 1, WIDTH * 2 + 1], // rotate 270 degree
]
const ㅁ블록 = [
  [ 0, 1, WIDTH, WIDTH + 1], // rotate 0 degree
  [ 0, 1, WIDTH, WIDTH + 1], // rotate 90 degree
  [ 0, 1, WIDTH, WIDTH + 1], // rotate 180 degree
  [ 0, 1, WIDTH, WIDTH + 1], // rotate 270 degree
]
const ㅣ블록 = [
  [ 1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1], // rotate 0 degree
  [ WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3], // rotate 90 degree
  [ 1, WIDTH + 1, WIDTH * 2 + 1, WIDTH * 3 + 1], // rotate 180 degree
  [ WIDTH, WIDTH + 1, WIDTH + 2, WIDTH + 3], // rotate 270 degree
]


const 테트리스_블록_목록 = [ㄱ블록, ㄹ블록, ㅗ블록, ㅁ블록, ㅣ블록];

let currentPosition = 4;
let currentRotation = 0;

// Random select for next block !
let random = Math.floor(Math.random() * 테트리스_블록_목록.length);
let nextBlock = 테트리스_블록_목록[random][currentRotation];

function draw() {
  console.log('선택된 블록', nextBlock);

  nextBlock.forEach(idx => {
    grids[currentPosition + idx].classList.add('block');
  })
}


draw();
