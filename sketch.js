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
var drawing = true;
var dragged = false;

function mouseDragged() {
  if (drawing) {
    if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
      stroke(currentColor); // Change the color
      strokeWeight(slider.value * 2); // Make the points 10 pixels in size
      line(mouseX - 5, mouseY - 5, pmouseX - 5, pmouseY - 5);
      pushCurrentLine();
      dragged = true;
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
    if (brushMode == "brush" || brushMode == "eraser") {
      stroke(currentColor);
      strokeWeight(slider.value * 2);
      line(mouseX - 5, mouseY - 5, mouseX - 5, mouseY - 5);
      pushCurrentLine();
    }
  }
}

function mouseReleased() {
  if (((mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) || dragged) && (brushMode == "brush" || brushMode == "eraser")) {
    drawn.push(currentLine);
    currentLine = [];
    dragged = false;
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
    drawing = true;
    erase();
  } else if (mode == "brush") {
    drawing = true;
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

function clearCanvas() {
  drawn = []
  currentLine = []
  clear();
}
