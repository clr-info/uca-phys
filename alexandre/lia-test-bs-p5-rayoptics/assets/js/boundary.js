class Boundary {
  static count = 0;

  constructor(x1, y1, x2=-1, y2=-1) {
    this.a = createVector(x1, y1);
    if(x2!=-1 && y2!=-1){
      this.b = createVector(x2, y2);
    }
    this.id = Boundary.count++;
    this.isDrawn = false;
  }

  setB(x2, y2){
    this.b = createVector(x2, y2);
  }

  lookAt(x, y) {
    line(this.a.x, this.a.y, x, y);
  }

  show() {
    stroke(255);
    if(typeof this.b !== 'undefined' ){
      line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
}