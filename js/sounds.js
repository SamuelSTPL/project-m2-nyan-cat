class Sound {
  constructor(root, source) {
    const song = document.createElement("audio");

    root.appendChild(song);
    song.src = source;

    this.domElement = song;
  }
  play = () => {
    this.domElement.play();
  };
}

const chewSound = new Sound(ROOT, "sounds/chew.mp3");
const climbSound = new Sound(ROOT, "sounds/climb.mp3");
const goingSound = new Sound(ROOT, "sounds/going.mp3");
const hailSound = new Sound(ROOT, "sounds/hail.mp3");
const comingSound = new Sound(ROOT, "sounds/coming.mp3");
const damnSound = new Sound(ROOT, "sounds/damn.mp3");
const backgroundMusic = new Sound(ROOT, "sounds/timecop.mp3");

console.log(chewSound);
