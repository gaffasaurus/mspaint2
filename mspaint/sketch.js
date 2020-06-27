function setup() {
  createCanvas(500, 450);
}

function draw() {
  // fill(0, 0, 0);
  // ellipse(window.innerWidth/2, window.innerHeight/2, 50, 50);
  noStroke()
}

let r = 0;
let g = 0;
let b = 0;

function changeColor(color) {
  if (color == "black") {
    r = 0;
    g = 0;
    b = 0;
    document.getElementById("currentcolor").innerHTML = "Current Color: Black";
  } else if (color == "red") {
    r = 255;
    g = 0;
    b = 0;
    document.getElementById("currentcolor").innerHTML = "Current Color: Red";
  } else if (color == "green") {
    r = 0;
    g = 255;
    b = 0
    document.getElementById("currentcolor").innerHTML = "Current Color: Green";
  } else if (color == "blue") {
    r = 0;
    g = 0;
    b = 255;
    document.getElementById("currentcolor").innerHTML = "Current Color: Blue";
  }
}
//
// var slider = document.getElementById("strokeSlider");
// slider.oninput = changeStroke(slider.value);
// function changeStroke(stroke) {
//   this.stroke = stroke;
// }

function currentColor() {
    return document.getElementById("currentcolor").innerHTML
}

function mouseDragged() {
  // fill(r, g, b);
  // ellipse(mouseX, mouseY, 6, 6);
  stroke(r, g, b); // Change the color
  strokeWeight(5); // Make the points 10 pixels in size
  line(mouseX - 5, mouseY - 5, pmouseX - 5, pmouseY - 5)
}

function mouseClicked() {
  stroke(r, g, b);
  strokeWeight(5);
  point(mouseX - 5, mouseY - 5)
}

function clearCanvas() {
  clear();
}
