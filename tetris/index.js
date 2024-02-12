const grids = document.querySelectorAll('#grid-container div');

const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');

let timerId;

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
let currentBlock = 테트리스_블록_목록[random][currentRotation];


function draw() {
  currentBlock.forEach(idx => {
    grids[currentPosition + idx].classList.add('block');
  })
}

function undraw() {
  currentBlock.forEach(idx => {
    grids[currentPosition + idx].classList.remove('block');
  })
}

draw();

// 매 초마다 블록을 아래로 움직이기
timerId = setInterval(moveDown, 1000);

// 좌,우 키 이벤트 할당
function handleKeyDown(e) {
  switch (e.keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      // rotate();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
  }

  // Left Arrow
  if (e.keyCode === 37) {
    moveLeft();
  }
}
document.addEventListener('keyup', handleKeyDown);


function moveDown() {
  undraw();
  currentPosition += WIDTH;
  draw();
  freeze();
}

function moveLeft() {
  undraw();

  const isLeftEdge = currentBlock.some(idx => (currentPosition + idx) % WIDTH === 0);

  if (!isLeftEdge) currentPosition -= 1;

  if (currentBlock.some(idx => grids[currentPosition + idx].classList.contains('collision'))) {
    currentPosition += 1;
  }

  draw();
}

function moveRight() {
  undraw();

  const isRightEdge = currentBlock.some(idx => (currentPosition + idx) % WIDTH === WIDTH - 1);

  if (!isRightEdge) currentPosition += 1;

  if (currentBlock.some(idx => grids[currentPosition + idx].classList.contains('collision'))) {
    currentPosition -= 1;
  }

  draw();
}

function freeze() {
  // 현재 블록 중 어느 곳이라도 바닥과 충돌하였는지 체크
  if (currentBlock.some(idx => grids[currentPosition + idx + WIDTH].classList.contains('collision'))) {
    // 만약 충돌하였다면 블록에 충돌 표기
    currentBlock.forEach(idx => grids[currentPosition + idx].classList.add('collision'))

    // 다시 랜덤 돌리기 , 포지션 리셋
    random = Math.floor(Math.random() * 테트리스_블록_목록.length);
    currentBlock = 테트리스_블록_목록[random][currentRotation];
    currentPosition = 4;

    draw();
  }
}
