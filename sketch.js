
var cat_stand;
var cat_jump;
var cat_loc = {
  x: 450,
  y: 261
}
var catAnimation;
var box;
var triggered = "false";
var score = 0;
var start_time = 0;
var end_time = 0;

function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');

  cat_stand = loadImage("./sprite/kiteh/kiteh1.png");
  cat_jump = loadImage("./sprite/kiteh/kiteh2.png");
  cat_meow = loadImage("./sprite/meow.png");

  numbers_zero = loadImage("./sprite/numbers/zero.png");
  numbers_one = loadImage("./sprite/numbers/one.png");
  numbers_two = loadImage("./sprite/numbers/two.png");
  numbers_three = loadImage("./sprite/numbers/three.png");
  numbers_four = loadImage("./sprite/numbers/four.png");
  numbers_five = loadImage("./sprite/numbers/five.png");
  numbers_six = loadImage("./sprite/numbers/six.png");
  numbers_seven = loadImage("./sprite/numbers/seven.png");
  numbers_eight = loadImage("./sprite/numbers/eight.png");
  numbers_nine = loadImage("./sprite/numbers/nine.png");


  numbers_zero_sprite = createSprite(575, 25);
  numbers_zero_sprite.addImage(numbers_zero);

  numbers_tens = loadImage("./sprite/numbers/zero.png");
  numbers_tens_sprite = createSprite(540, 25);
  numbers_tens_sprite.addImage(numbers_zero);

  numbers_hundreds = loadImage("./sprite/numbers/zero.png");
  numbers_hundreds_sprite = createSprite(505, 25);
  numbers_hundreds_sprite.addImage(numbers_zero);

  numbers_thousands = loadImage("./sprite/numbers/zero.png");
  numbers_thousands_sprite = createSprite(470, 25);
  numbers_thousands_sprite.addImage(numbers_zero);



  cat_sprite = createSprite(cat_loc.x, cat_loc.y);
  cat_sprite.addImage(cat_stand);

  var vel = 0;
  var ok = "yes";
  function makeEpic() {
    if (ok == "yes") {
      var s = createSprite(cat_loc.x, cat_loc.y, 5, 5);
      s.velocity.x = random(-5, 5);
      s.velocity.y = random(-5, 5);
      vel += 0.25;
      setTimeout(makeEpic, 150);
    }
  }
  cat_sprite.onMousePressed = function() {
    makeEpic();

    console.log("click");
  }
  cat_sprite.onMouseReleased = function() {
    ok = "no";
    console.log(`velocity: ${vel}`)
    this.addImage(cat_jump);
    this.velocity.y -= vel;
    cat_sprite.rotationSpeed = -2;
    triggered = "true";
    start_timer();
    console.log(`Start Time: ${start_time}`);
    moveOffBox();
  }

}


var triggered = "false";
function draw() {
  background(255,255,255);
  strokeWeight(2);
  line(400, 300, 600, 300);
  strokeWeight(2);
  line(400, 400,400,300);
  //strokeWeight(2);

  if (triggered == "true") {
    writeScore();
  }

  if (cat_sprite.position.y > 357) {
    cat_sprite.velocity.y = 0;
    cat_sprite.velocity.x = 0;
    cat_sprite.rotationSpeed = 0;
    var bubbleX = cat_sprite.position.x - 75;
    var bubbleY = cat_sprite.position.y - 50;
    cat_says = createSprite( bubbleX, bubbleY);
    cat_says.addImage(cat_meow);

    finishWritingScore = true;
    triggered = "false";
  }
  if (cat_sprite.position.y <0) {
    cat_sprite.velocity.y = 0;
    cat_sprite.velocity.x = 0;
    cat_sprite.rotationSpeed = 0;
    var bubbleX = cat_sprite.position.x - 95;
    var bubbleY = cat_sprite.position.y + 70;
    cat_says = createSprite( bubbleX, bubbleY);
    cat_says.addImage(cat_meow);
    finishWritingScore = true;
    triggered = "false";
  }
  if (triggered == "true") {
    cat_sprite.addSpeed(0.05, 90);
  }

  drawSprites();
}

function moveOffBox() {
  cat_sprite.velocity.x -= 1.3;
}

var didStart = false;
function start_timer() {
  if (!didStart) {
    start_time = new Date().getTime();
    didStart = true;
  }
}

function getNumber(place) {
  var number = place;
  switch(number) {
    case 0:
        return numbers_zero
        break;
    case 1:
        return numbers_one
        break;
    case 2:
        return numbers_two
        break;
    case 3:
        return numbers_three
        break;
    case 4:
        return numbers_four
        break;
    case 5:
        return numbers_five
        break;
    case 6:
        return numbers_six
        break;
    case 7:
        return numbers_seven
        break;
    case 8:
        return numbers_eight
        break;
    case 9:
        return numbers_nine
        break;
    default:
        return 0
    }
}

var finishWritingScore = false;
function writeScore() {
  if (!finishWritingScore) {
    end_time = new Date().getTime();
    var score = end_time - start_time;

    var score_zeros = score % 10;
    numbers_zero_sprite.addImage(getNumber(score_zeros));

    var score_tens = Math.floor((score % 100) / 10);
    numbers_tens_sprite.addImage(getNumber(score_tens));

    var score_hundreds = Math.floor((score % 1000) / 100);
    numbers_hundreds_sprite.addImage(getNumber(score_hundreds));

    var score_thousands = Math.floor((score % 10000) / 1000);
    numbers_thousands_sprite.addImage(getNumber(score_thousands));
  }
};
