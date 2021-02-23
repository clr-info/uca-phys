// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;   

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;
let inputCgTest;
let okBeam;
// variable qu il faudra initialiser dans setup
let size, couleurName ;

function setup() { 
  let canvas = createCanvas(710, 710);
  canvas.class("border-1g border-info")
  angleMode(DEGREES);
  background(127);

  // Creating the save button for the file
  // saveButton = createButton('save');
  saveButton = createButtonCustum('save', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
  saveButton.mousePressed(saveFile);
  // Creating the clear screen button
  // clearButton = createButton('clear');
  clearButton = createButtonCustum('clear', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
  clearButton.mousePressed(clearScreen);
  // Creating the button for Full Screen
  // fullscreenButton = createButton('Full Screen');
  fullscreenButton = createButtonCustum('Full Screen', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
  fullscreenButton.mousePressed(screenFull);
  // Setting up the slider for the thickness of the brush
  // brushSizeSlider = createButton('Brush Size Slider');
  brushSizeSlider = createButtonCustum('Brush Size Slider', {type: "button", classes: "btn btn-success", parent: "myContainerBtn"});
  
  sizeSlider = createSlider(1, 32, 4, 0.1);
  sizeSlider.parent("myContainerBtn");
 
  // canvas
  canvas.parent("myContainer");
  canvas.id("canvas1");
  document.getElementById("myContainerBtn").style.marginTop = "15px";

  // alx - gestion interaction
  inputCgTest = createInput().parent("myContainerFooterConfig");

  okBeam = select("#okBeam");
  // console.log(document.getElementById("okBeam"));
  // console.log(select("#okBeam"));
  // console.log( selectAll(".radioButtonAdd") ) ;

  // initilisation value
  size = sizeSlider.value();
  couleurName = "black";
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);

        stroke(color(couleurChoice()));
        strokeWeight(sizeChoice());
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

function sizeChoice() {
  let radioval = $('input[name="radioButtonAdd"]:checked').val();
  inputCgTest.value(radioval);

  if(radioval==="BEAMS"){
    size = $('#BEAMS1').val();
  }
  return size;
}

function couleurChoice() {
  let radioval = $('input[name="radioButtonAdd"]:checked').val();
  inputCgTest.value(radioval);
  if(radioval==="couleur"){
    if($('input[name="couleur"]:checked').val()){
      couleurName =  $('input[name="couleur"]:checked').val();
    }
  }
  return couleurName;
}

//function createButtonCustum(title, type, classes, parent) {
  function createButtonCustum(title, params) {
    let type = params.hasOwnProperty("type") ? params.type : undefined;
    let classes = params.hasOwnProperty("classes") ? params.classes : undefined;
    let parent = params.hasOwnProperty("parent") ? params.parent : undefined;

    let btn = createButton(title);
    if (type !== undefined) btn.attribute("type", type);
    if (classes !== undefined) btn.class(classes);
    if (parent !== undefined) btn.parent(parent);

    btn.style('margin-left','7px');
    btn.style('margin-right','7px');

    return btn;
  }

  // Save File Function
  function saveFile() {
    save('design.jpg');
  }

  // Clear Screen function
  function clearScreen() {
    background(127);
  }

  // Full Screen Function
  function screenFull() {
    let fs = fullscreen();
    fullscreen(!fs);
  }