
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

let istruehover = true;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//context and id of canvas

const w = window.innerWidth;
const h = window.innerHeight;
//width and height of canvas

canvas.width = w;
canvas.height = h;
//setting the width and height for canvas

const mouse = {
  x: w / 2, 
  y: h / 2
};
//mouse position

document.addEventListener('mousemove', function(event){ 
    mouse.x = event.clientX || event.pageX; 
    mouse.y = event.clientY || event.pageY;
  
    istruehover = false;
}, false);

document.addEventListener('mouseover', function(){ 
    istruehover = false;
}, false);
//finding the mouse position

const particles = [];
for(let x = 0; x < canvas.width / 33; x++) {
  for(let y = 0; y < canvas.height / 34; y++) {
    particles.push(new particle(x*33, y*33));
  }
}

//the particle function
function particle(x, y) {
  this.x = x + 20;
  this.y = y + 20;
  
  this.xo = x + 20;
  this.yo = y + 20;
  
  this.vx = 0;
  this.vy = 0;
  
  this.r = 15;
  
  const one = 'rgba(10, 255, 255, 0.7)';
  const two = 'rgba(255, 255, 255, 0.7)';
  const three = 'rgba(10, 255, 255, 0.9)';
  const four = 'rgba(255, 255, 255, 0.9)';
  const five = 'rgba(10, 255, 255, 0.5)';
  const six = 'rgba(255, 255, 255, 0.5)';
  const colors = [one, two, three, four, five, six];
  this.color = colors[Math.round(Math.random() * 2)];
  //only random colors of the constiables
}

function draw() {
  requestAnimFrame(draw);
  
  ctx.fillStyle = 'rgba(52, 52, 53, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  /*
  ctx.beginPath();
  ctx.fillStyle = 'orange';
  ctx.arc(mouse.x, mouse.y, 40, Math.PI * 2, false);
  ctx.fill();
  */
  
  for(t = 0; t < particles.length; t++) {
    const p = particles[t];
    
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();
    //the context of the particle(s)
    
  let dist,
		dx = mouse.x - p.x,
		dy = mouse.y - p.y;
	
	dist = Math.sqrt(dx*dx + dy*dy);
  
	if(dist <= 100) {
		const ax = dx,
			ay = dy;

      p.x -= ax/25;
      p.y -= ay/25;
  }
    

  let disto,
		dxo = p.x - p.xo,
		dyo = p.y - p.yo;
    
    disto = Math.sqrt(dxo*dxo + dyo*dyo);

    p.x -= dxo/50;
    p.y -= dyo/50;
    // making the particles move back into place
    
    if(disto != 0) {
      p.r = (disto / 4) + 15; 
      // simple algebra XD
    }

}
}

draw();
