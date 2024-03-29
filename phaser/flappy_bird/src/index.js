import Phaser from 'phaser';

const config = {
  // WebGL (Web graphics library) JS Api for rendering 2D and 3D graphics.
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

// Loading assets, such as images, sounds, etc.
function preload() {
  // 'this' context - scene
  // You can check info when using debugger in this line developer tools log this.
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

let bird = null;
const flapVelocity = 250;
const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 };

const VELOCITY = 200;

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

// 60 fps
// 60 times per second
// 60 * 16ms = 1000ms
function update(time, delta) {
  if (bird.y > config.height || bird.y < -bird.height) {
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
  }
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config)
