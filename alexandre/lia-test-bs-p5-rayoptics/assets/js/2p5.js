let s = function( p ) {
  // Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
  let symmetry = 6;   
  
  let angle = 360 / symmetry;
  let saveButton, clearButton, mouseButton, keyboardButton;
  
  p.setup = function setup() { 
    let canvas = p.createCanvas(710, 710);
    canvas.class("border-1g border-info")
    p.angleMode(p.DEGREES);
    p.background(127);
  
    // Creating the save button for the file
    // saveButton = createButton('save');
    saveButton = p.createButtonCustum('save', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
    saveButton.mousePressed(saveFile);
    // Creating the clear screen button
    // clearButton = createButton('clear');
    clearButton = p.createButtonCustum('clear', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
    clearButton.mousePressed(clearScreen);
    // Creating the button for Full Screen
    // fullscreenButton = createButton('Full Screen');
    fullscreenButton = p.createButtonCustum('Full Screen', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
    fullscreenButton.mousePressed(screenFull);
    // Setting up the slider for the thickness of the brush
    // brushSizeSlider = createButton('Brush Size Slider');
    brushSizeSlider = p.createButtonCustum('Brush Size Slider', {type: "button", classes: "btn btn-dark", parent: "myContainerBtn"});
    
    sizeSlider = p.createSlider(1, 32, 4, 0.1);
    sizeSlider.parent("myContainerBtn");

    canvas.parent("myContainer");
    canvas.id("canvas1");
    document.getElementById("myContainerBtn").style.marginTop = "15px";
  }

    p.createButtonCustum = function createButtonCustum(title, params) {
    let type = params.hasOwnProperty("type") ? params.type : undefined;
    let classes = params.hasOwnProperty("classes") ? params.classes : undefined;
    let parent = params.hasOwnProperty("parent") ? params.parent : undefined;
  
    let btn = p.createButton(title);
    if (type !== undefined) btn.attribute("type", type);
    if (classes !== undefined) btn.class(classes);
    if (parent !== undefined) btn.parent(parent);
  
    btn.style('margin-left','7px');
    btn.style('margin-right','7px');
    
    return btn;
  }
  
  // Save File Function
  function saveFile() {
    p.save('design.jpg');
  }
  
  // Clear Screen function
  function clearScreen() {
    p.background(127);
  }
  
  // Full Screen Function
  function screenFull() {
    let fs = p.fullscreen();
    p.fullscreen(!fs);
  }
  
  p.draw = function draw() {
    p.translate(p.width / 2, p.height / 2);
  
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      let mx = p.mouseX - p.width / 2;
      let my = p.mouseY - p.height / 2;
      let pmx = p.pmouseX - p.width / 2;
      let pmy = p.pmouseY - p.height / 2;
      
      if (p.mouseIsPressed) {
        for (let i = 0; i < symmetry; i++) {
          p.rotate(angle);
          let sw = sizeSlider.value();
          p.strokeWeight(sw);
          p.line(mx, my, pmx, pmy);
          p.push();
          p.scale(1, -1);
          p.line(mx, my, pmx, pmy);
          p.pop();
        }
      }
    }
  }
};
new p5(s); 

var s2 = function( sketch ) {

  sketch.setup = function() {
   let canvas2 = sketch.createCanvas(700, 700);
   sketch.x = sketch.width / 2;
   sketch.y = sketch.height / 2;
   sketch.background(0);
   canvas2.parent("myContainer2");
   canvas2.class("mx-auto");
 }
 sketch.draw = function() {
   //for canvas 2
   sketch.fill(255,255,255,15);
   sketch.noStroke()
   sketch.ellipse(sketch.x,sketch.y,48,48);

   sketch.x = sketch.x + sketch.random(-15, 15);
   sketch.y = sketch.y + sketch.random(-15, 15);

   if( sketch.x > sketch.width || sketch.x < 0 
   || sketch.y > sketch.height || sketch.y < 0 ) {
     sketch.y = sketch.height / 2;
     sketch.x = sketch.width / 2;
   }
 }
};

let sketch = new p5(s2);
function resetBackground(){
  sketch.background(0);
}
setInterval(resetBackground, 20000);