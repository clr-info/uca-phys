var s3 = function( p ) {
  // this class describes the properties of a single particle.
  class Particle {
      // setting the co-ordinates, radius and the
      // speed of a particle in both the co-ordinates axes.
        constructor(){
          this.x = p.random(0,p.width);
          this.y = p.random(0,p.height);
          this.r = p.random(1,8);
          this.xSpeed = p.random(-2,2);
          this.ySpeed = p.random(-1,1.5);
        }
      
      // creation of a particle.
        createParticle() {
          p.noStroke();
          p.fill('rgba(200,169,169,0.5)');
          p.circle(this.x,this.y,this.r);
        }
      
      // setting the particle in motion.
        moveParticle() {
          if(this.x < 0 || this.x > p.width)
            this.xSpeed*=-1;
          if(this.y < 0 || this.y > p.height)
            this.ySpeed*=-1;
          this.x+=this.xSpeed;
          this.y+=this.ySpeed;
        }
      
      // this function creates the connections(lines)
      // between particles which are less than a certain distance apart
        joinParticles(particles) {
          particles.forEach(element =>{
            let dis = p.dist(this.x,this.y,element.x,element.y);
            if(dis<85) {
              p.stroke('rgba(255,255,255,0.04)');
              p.line(this.x,this.y,element.x,element.y);
            }
          });
        }
  }
      
  let particles = [];

  p.setup = function setup() {
    let canvas2 = p.createCanvas(720, 400);
    canvas2.parent("myContainer3");
    for(let i = 0;i<p.width/10;i++){
      particles.push(new Particle());
    }
  }

  p.draw = function draw() {
    p.background('#0f0f0f');
    for(let i = 0;i<particles.length;i++) {
      particles[i].createParticle();
      particles[i].moveParticle();
      particles[i].joinParticles(particles.slice(i));
    }
  }
}
let particle = new p5(s3);
    