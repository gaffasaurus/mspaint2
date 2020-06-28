let w = 850;
let h = 500;

function setup() {
  var myCanvas = createCanvas(w, h);
  myCanvas.parent("canvas")
}

function draw() {
  // fill(0, 0, 0);
  // ellipse(window.innerWidth/2, window.innerHeight/2, 50, 50);
  noStroke();
}


// function changeColor(color) {
//
  // if (color == "black") {
  //   r = 0;
  //   g = 0;
  //   b = 0;
  //   document.getElementById("currentcolor").innerHTML = "Current Color: Black";
  // } else if (color == "red") {
  //   r = 255;
  //   g = 0;
  //   b = 0;
  //   document.getElementById("currentcolor").innerHTML = "Current Color: Red";
  // } else if (color == "green") {
  //   r = 0;
  //   g = 255;
  //   b = 0
  //   document.getElementById("currentcolor").innerHTML = "Current Color: Green";
  // } else if (color == "blue") {
  //   r = 0;
  //   g = 0;
  //   b = 255;
  //   document.getElementById("currentcolor").innerHTML = "Current Color: Blue";
  // }
// }
//
// var slider = document.getElementById("strokeSlider");
// slider.oninput = changeStroke(slider.value);
// function changeStroke(stroke) {
//   this.stroke = stroke;
// }

var colorPicker = document.getElementById("pickColor");
var currentColor = colorPicker.value;
colorPicker.addEventListener("input", function() {
  currentColor = colorPicker.value;
  document.getElementById("currentcolor").innerHTML = "Current Color: " + currentColor;
})

var slider = document.getElementById("strokeSlider");
var label = document.getElementById("strokeLabel")

function sliderMoved() {
  label.innerHTML = "Stroke size: " + slider.value
}

var drawn = [];
var currentLine = [];

function pushCurrentLine() {
  currentLine.push({
    x: mouseX - 5,
    y: mouseY - 5,
    px: pmouseX - 5,
    py: pmouseY -5,
    stroke: slider.value * 2,
    color: currentColor
  });
}

var brushMode = "brush";

function mouseDragged() {
  if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
    stroke(currentColor); // Change the color
    strokeWeight(slider.value * 2); // Make the points 10 pixels in size
    line(mouseX - 5, mouseY - 5, pmouseX - 5, pmouseY - 5);
    pushCurrentLine();
  } else {
    return;
  }
}

function mouseReleased() {
  if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
    drawn.push(currentLine);
    currentLine = [];
  } else {
    return;
  }
}

function resetButtonBackgrounds(buttons) {
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "transparent"
  }
}
function setBrushMode(mode) {
  brushMode = mode;
  var clicked = document.getElementById(mode);
  var others = [];
  var brushButtons = document.getElementById("brushMode").children;
  for (i = 0; i < brushButtons.length; i++) {
    if (brushButtons[i] != clicked) {
      others.push(brushButtons[i])
    }
  }
  resetButtonBackgrounds(others);
  clicked.style.backgroundColor = "#00FFFF";
  if (mode == "eraser") {
    erase();
  } else if (mode == "brush") {
    noErase();
  }
}

function undo() {
  background(255, 255, 255);
  drawn.pop();
  for (i = 0; i < drawn.length; i++) {
    for (j = 0; j < drawn[i].length; j++) {
      var lineData = drawn[i][j];
      stroke(lineData['color']);
      strokeWeight(lineData['stroke']);
      line(lineData['x'], lineData['y'], lineData['px'], lineData['py']);
    }
  }
}


function mousePressed() {
  if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
    stroke(currentColor);
    strokeWeight(slider.value * 2);
    line(mouseX - 5, mouseY - 5, mouseX - 5, mouseY - 5);
    pushCurrentLine();
  }
}

function clearCanvas() {
  drawn = []
  currentLine = []
  clear();
}
