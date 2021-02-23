// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let menuForm = [
  { 
    "name":"BEAMS",
    "fields": [
      {"name":"field1","title":"field1 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"20", "id":"BEAMS1"},
      {"name":"field2","title":"field2 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS2"},
      {"name":"field3","title":"field3 title", "type":"number", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS3"},
      {"name":"field4","title":"field4 title", "type":"text", "style":"width: 45px;padding: 1px", "value":"0", "id":"BEAMS4"},
    ]
  },
  { 
    "name":"couleur",
    "fields": [
      {"name":"couleur","title":"black couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"black", "id":"couleur1"},
      {"name":"couleur","title":"red couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"red", "id":"couleur2"},
      {"name":"couleur","title":"magenta couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"magenta", "id":"couleur2"},
      {"name":"couleur","title":"orange couleur", "type":"radio", "style":"width: 45px;padding: 1px", "value":"orange", "id":"couleur2"},
    ]
  }
];

let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let bound;

let saveButton, clearButton, mouseButton, keyboardButton;
let slider;
let inputCgTest;
// variable qu il faudrait initialiser dans setup?
let size, couleurName ;
let rays = [];
let bounds = [];
let initialBoundNumber = 6;
//
let menuevent = new Menuevent();


function setup() { 
  let canvas = createCanvas(windowWidth * 0.75, 710);
  canvas.class("border-1g border-info")
  background(0);

  menuevent.init(menuForm);

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


  // initilisation value
  size = sizeSlider.value();
  couleurName = "black";

  bound = new Boundary(600, 100, 600, 500);bounds.push(bound);
  bound2 = new Boundary(300, 100, 500, 500);bounds.push(bound2);
  // ray = new Ray(createVector(200, 200), radians(15));
  topSide = new Boundary(0, 0, width, 0);bounds.push(topSide);
  rightSide = new Boundary(width, 0, width, height);bounds.push(rightSide);
  downSide = new Boundary(width, height, 0, height);bounds.push(downSide);
  leftSide = new Boundary(0, height, 0, 0);bounds.push(leftSide);
}

function draw() {
  background(0);

  traceShape(shapeChoice());

  for(let bound of bounds ) {
    bound.show();
  }
  for(let ray of rays ) {
    ray.show();
    ray.look(bounds)
  }
}

function rayBeingCreated(){
  if(rays.length > 0 && rays[rays.length-1]['isDrawn'] === false){
    rays[rays.length-1].lookAt(mouseX, mouseY);
    rays[rays.length-1].look(bounds)
  }
}

function boundBeingCreated(){
  if((bounds.length-initialBoundNumber) > 0 && bounds[bounds.length-1]['isDrawn'] === false){
    bounds[bounds.length-1].lookAt(mouseX, mouseY);
  }
}

function mousePressed(){
  if(shapeChoice() === 'ray') {
    if(rays.length > 0 && rays[rays.length-1]['isDrawn'] === false){
      rays[rays.length-1]['isDrawn'] = true;
      return;
    }
    let rayNew = new Ray(createVector(mouseX, mouseY), radians(15));
    rays.push(rayNew);
  }
  if(shapeChoice() === 'bound') {
    if((bounds.length-initialBoundNumber) > 0 && bounds[bounds.length -1]['isDrawn'] === false){
      // console.log(bounds.length-1);
      bounds[bounds.length-1]['isDrawn'] = true;

      // console.log(bounds[bounds.length-1]);
      bounds[bounds.length-1].setB(mouseX, mouseY);
      return;
    }
    let boundNew = new Boundary(mouseX, mouseY);
    bounds.push(boundNew);
  }
}

function shapeChoice() {
  //return $('input[name="radioButtonAdd"]:checked').val();
  return menuevent.getChoiceChecked();
}

function traceShape(shape){
  switch (shape) {
    case 'ray':
      rayBeingCreated();
      break;
    case 'bound':
      boundBeingCreated();
      break;
    default:
      console.log( "no_shape" );
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