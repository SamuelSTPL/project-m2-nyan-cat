// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    if (score > 50 && score < 60) {
      ///////////////////////////////////////////////////////////////////
      hailSound.play();
      ///////////////////////////////////////////////////////////////////
    }
    if (score > 150 && score < 160) {
      ///////////////////////////////////////////////////////////////////
      hailSound.play();
      ///////////////////////////////////////////////////////////////////
    }
    if (score > 350 && score < 360) {
      ///////////////////////////////////////////////////////////////////
      chewSound.play();
      ///////////////////////////////////////////////////////////////////
    }

    if (score > 50 && score <= 150) {
      backgroundColor = "green";
      this.changingColor("green");
      this.player.update("green");
      MAX_ENEMIES = 4;
    }
    if (score > 150 && score <= 350) {
      backgroundColor = "yellow";
      this.changingColor("yellow");
      this.player.update("yellow");
      MAX_ENEMIES = 5;
    }
    if (score > 350) {
      backgroundColor = "red";
      this.changingColor("red");
      this.player.update("red");
      MAX_ENEMIES = 6;
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      document.getElementById("restartMenu").style.display = "flex";
      return;
    }

    if (this.hasWon()) {
      comingSound.play();
      document.getElementById("victory").style.display = "flex";
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 5);
    // console.log(this.player);
    // console.log(this.enemies);
  };

  changingColor = (color) => {
    document.getElementById("top").style.color = color;
    document.getElementById(
      "top"
    ).style.textShadow = `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px #fff, 0 0 20px ${color}, 0 0 30px ${color}, 0 0 40px ${color}, 0 0 55px ${color}, 0 0 75px ${color}`;
    let changeMe = [displayScore, displayLifes];
    changeMe.forEach((item) => {
      console.log(item);
      item.domElement.style.color = color;
    });
  };

  playerHit = () => {
    life--;
    ///////////////////////////////////////////////////////////////////
    damnSound.play();
    ///////////////////////////////////////////////////////////////////
    displayLifes.update(`Lifes: ${life}`);
    invincible = true;
    setTimeout(function () {
      invincible = false;
    }, 1000);
  };

  hasWon = () => {
    if (score >= 800) {
      return true;
    }
  };

  isPlayerDead = () => {
    let isDead = false;
    if (life === 0) {
      isDead = true;
      return isDead;
    }
    this.enemies.forEach((enemy) => {
      if (
        enemy.x < this.player.x + (PLAYER_WIDTH - 15) &&
        enemy.x + (ENEMY_WIDTH - 15) > this.player.x &&
        enemy.y < this.player.y + (PLAYER_HEIGHT - 15) &&
        enemy.y + (ENEMY_HEIGHT - 15) > this.player.y &&
        invincible === false
      ) {
        this.playerHit();
      }
    });
    return isDead;
  };
}
