// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 75;
const ENEMY_HEIGHT = 115;
let MAX_ENEMIES = 3;

// These constants represent the player width and height.
const PLAYER_WIDTH = 55;
const PLAYER_HEIGHT = 54;

const ROOT = document.getElementById("app");

let backgroundColor = "blue";

let score = 0;
let life = 3;
let invincible = false;

const LEFT = -560;
