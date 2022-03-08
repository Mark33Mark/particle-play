

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

let istruehover = true;

//context and id of canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//setting the width and height for canvas
const w = window.innerWidth;
const h = window.innerHeight;

canvas.width = w;
canvas.height = h;


//mouse position
const mouse = {
  x: w / 2,
  y: h / 2,
};

document.addEventListener(
  "mousemove",
  function ( event ) {
    mouse.x = event.clientX || event.pageX;
    mouse.y = event.clientY || event.pageY;

    istruehover = false;
  },
  false
);

document.addEventListener(
  "mouseover",
  function () {
    istruehover = false;
  },
  false
);

//finding the mouse position
// also sets compression of the dots - initially canvas.width/33, canvas.height/34, x*33, y*33
const particles = [];
for (let x = 0; x < canvas.width / 12; x++) {
  for (let y = 0; y < canvas.height / 13; y++) {
    particles.push(new particle(x * 12, y * 12));
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

  this.r = 5;

  const one = "rgba(255, 85, 255, 0.7)";
  const two = "rgba(255, 85, 255, 0.3)";
  const three = "rgba(255, 85, 255, 0.9)";
  const four = "rgba(255, 85, 255, 0.5)";
  const five = "rgba(255, 85, 255, 0.5)";
  const six = "rgba(255, 85, 255, 0.1)";
  const colors = [one, two, three, four, five, six];
  
  this.color = colors[Math.round(Math.random() * 2)];
  
}

function draw() {

  requestAnimFrame(draw);

  ctx.fillStyle = "rgba(52, 52, 53, 0.75)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // orange ball or image as cursor pointer
  const img = new Image();
  img.src = './assets/prospero@3x_oceanBlue.svg';

  ctx.beginPath();
  // ctx.fillStyle = 'orange';
  // ctx.arc(mouse.x, mouse.y, 15, Math.PI * 2, false);
  ctx.drawImage(img, mouse.x-180, mouse.y-40, 368, 64 );
  // ctx.fill();


  for (t = 0; t < particles.length; t++) {
    const p = particles[t];

    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();

    //the context of the particle(s)
    let dist,
        dx = mouse.x - p.x,
        dy = mouse.y - p.y;

    dist = Math.sqrt(dx * dx + dy * dy);

    // <=75 represents radius of the ball around the mouse
    if (dist <= 200) {
      const ax = dx,
            ay = dy;

      p.x -= ax / 10;
      p.y -= ay / 10;
    }

    let disto,
      dxo = p.x - p.xo,
      dyo = p.y - p.yo;

    disto = Math.sqrt(dxo * dxo + dyo * dyo);

    p.x -= dxo / 10;
    p.y -= dyo / 10;

    // making the particles move back into place
    if (disto != 0) {
      p.r = ( disto / 16 ) + 5;
      // simple algebra XD
    }
  }
}

draw();

