
const url1 = 'https://quickdrawfiles.appspot.com/drawing/';
const url2 = '?isAnimated=true&format=json&key=';
let word;
var num;

let strokeIndex = 0;
let index = 0;
let cat;
let prevx, prevy;
let keyInput;
let start;
let score = 0;
var timer = 10;

function preload(){
  word=loadStrings("words.txt");
}

function setup() {
  createCanvas(1280, 720);
  textSize(32);
  newCat();

}

function newCat() {
  let apiKey = 'AIzaSyCLxdiMV5-46xuFWFbdDhVoJi7DMwe-H9Q'; // keyInput.value();
  num = floor(random(word.length));
  var y = loadJSON(url1 + word[num] + url2 + apiKey, gotCat);
  console.log(y);
}


function gotCat(data) {
  background(255);
  textSize(32);
  stroke(0);
  strokeWeight(0);
  text('Score : ' + score,0,50);
  //text(word[num],600,400);
  cat = data.drawing;
}

function draw() {
  if (cat) {
    let x = cat[strokeIndex][0][index];
    let y = cat[strokeIndex][1][index];
    stroke(0);
    strokeWeight(3);
    if (prevx !== undefined || prevy !== undefined) {
      line(prevx, prevy, x, y);
    }
    index++;
    if (index === cat[strokeIndex][0].length) {
      strokeIndex++;
      prevx = undefined;
      prevy = undefined;
      index = 0;
      if (strokeIndex === cat.length) {
        cat = undefined;
        strokeIndex = 0;
        //setTimeout(newCat, 1000);
      }
    } else {
      prevx = x;
      prevy = y;
    }
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
    getText();
  }
}

function getText(){
  var x = document.getElementById("sampleText").value;
  document.getElementById("sampleText").value=''
  if(x==word[num]){
    score+=timer;
    timer=11;
    newCat();
  }
}

function startTimer(duration, display) {
    timer = 11;
    setInterval(function () {
        timer--;
        document.getElementById("time").innerHTML = timer;

        if (timer <= 0) {
            timer = 10;
            newCat();
        }
    }, 1000);
}

window.onload = function () {
    display = document.querySelector('#time');
    startTimer(10, display);
};
