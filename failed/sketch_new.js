let w = 850;
let h = 500;

function setup() {
  var myCanvas = createCanvas(w, h);
  myCanvas.parent("canvas")
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

function pushDrawn(x1, y1, x2, y2) {
  drawn.push([{
    x1: mouseX - 5,
    y1: mouseY - 5,
    x2: mouseX - 5,
    y2: mouseY - 5,
    stroke: slider.value * 2,
    color: currentColor
  }])
}

function pushCurrentLine() {
  currentLine.push({
    x1: mouseX - 5,
    y1: mouseY - 5,
    x2: pmouseX - 5,
    y2: pmouseY -5,
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
  } else {
    drawing = false;
  }
}

var clickCounter = 0;
var linePoints = [];
function mouseClicked() {
  if (mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
    if (brushMode == "line") {
      clickCounter++;
      if (clickCounter == 1) {
        stroke(currentColor);
        strokeWeight(slider.value * 2);
        point(mouseX - 5, mouseY - 5);
        linePoints.push(mouseX - 5);
        linePoints.push(mouseY - 5);
        pushDrawn(mouseX - 5, mouseY - 5, mouseX - 5, mouseY - 5);
      } else if (clickCounter == 2) {
        stroke(currentColor);
        strokeWeight(slider.value * 2);
        line(linePoints[0], linePoints[1], mouseX - 5, mouseY - 5);
        clickCounter = 0;
        linePoints = [];
        pushDrawn(linePoints[0], linePoints[1], mouseX - 5, mouseY - 5);
      }
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
    erase();
    drawing = true;
  } else if (mode == "brush") {
    noErase();
    drawing = true;
  } else if (mode == "line") {
    drawing = false;
    noErase();
  }
}

function redraw() {
  for (i = 0; i < drawn.length; i++) {
    for (j = 0; j < drawn[i].length; j++) {
      var lineData = drawn[i][j];
      stroke(lineData['color']);
      strokeWeight(lineData['stroke']);
      line(lineData['x'], lineData['y'], lineData['x2'], lineData['y2']);
    }
  }
}

function undo() {
  background(255, 255, 255);
  drawn.pop();
  redraw();
}

function clearCanvas() {
  drawn = []
  currentLine = []
  clear();
}

function draw() {
  // fill(0, 0, 0);
  // ellipse(window.innerWidth/2, window.innerHeight/2, 50, 50);
  // noStroke();
  if (brushMode == "line") {
    if (clickCounter == 1) {
      stroke(currentColor);
      strokeWeight(slider.value * 2);
      line(linePoints[0], linePoints[1], mouseX - 5, mouseY - 5);
      pushDrawn(linePoints[0], linePoints[1], mouseX - 5, mouseY - 5);
      background(255, 255, 255);
      redraw();
    }
  }
}
