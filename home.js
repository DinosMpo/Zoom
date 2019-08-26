"use strict"; //den 8umamai ti kanei

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let scaleFactor = 1;
let nx = 0;
let ny = 0;
let originX = 0;
let originY = 0;
let lastX = 0;
let lastY = 0;
let mouseX = 0;
let mouseY = 0;
let dragged = 0;
let dragStart = 0;

let translatePos = {
    x: 0,
    y: 0
};

function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function redraw() {
	clearCanvas();
	// ctx.save();
	// prepei na apo8hkeuw kapou ta prohgoumena
	// ctx.transform(scaleFactor,0,0,scaleFactor,0,0);
	//ctx.transform(a,b,c,d,e,f);
	//ctx.transform(1,0,0,1,0,0); deafult value
	// a horizontal scaling
	// d vertical scaling
	// e horizontal moving
	// f vertical moving
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'white';
	ctx.fillRect(250,250,100,100);
	// ctx.restore();
}

//diaxeirish otan ginetai scroll
function handleScroll(event) {
	if(event.deltaY == -3) { //zoom in
		if(scaleFactor < 1.5) {
			scaleFactor += 0.1;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			//edw logika 8a mpainei mia if ama 8elw na balw oria mallon
			zoom(scaleFactor, translatePos);
		}
	}else if(event.deltaY == 3) { //zoom out
		if(scaleFactor > 0.5) {
			scaleFactor -= 0.1;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			//edw logika 8a mpainei mia if ama 8elw na balw oria mallon
			zoom(scaleFactor, translatePos);
		}
	}
}

//diaxeirish gia to zoom
function zoom(scaleFactor, translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x, translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);

	// ctx.translate(-translatePos.x, -translatePos.y); giati eprepe na bazoume to anti8eto ? den douleue opws h8ela to zoom

	// prepei na apo8hkeuw kapou ta prohgoumena
	// ctx.transform(scaleFactor,0,0,scaleFactor,0,0);
	// ctx.transform(scaleFactor,0,0,scaleFactor,translatePos.x,translatePos.y); 
	// ctx.transform(scaleFactor,0,0,scaleFactor,-translatePos.x,-translatePos.y);
	redraw();
	ctx.restore();
}

//o kwdikas gia to drag
function drag(translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x,translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);
	redraw();
	ctx.restore();
}

//o kwdika
function trackTransforms(x, y) {
	originX = x;
	originY = y;
}

$(canvas).mousemove( (event) => {
	mouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
	mouseY = event.offsetY || (event.pageY - canvas.offsetTop);
	dragged = true;
	if (dragStart){
		translatePos.x = mouseX-dragStart.x;
		translatePos.y = mouseY-dragStart.y;
		drag(translatePos);
	}
});

canvas.addEventListener('mousedown',function(evt){
	// document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none'; //auto den kserw ti kanei
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragStart = {
		x: 0,
		y: 0
	} 
	if(isNaN(translatePos.x)) {
		translatePos.x = 0;
		translatePos.y = 0;
	}

	dragStart.x = lastX - translatePos.x;
	dragStart.y = lastY - translatePos.y;
	dragged = false;
},false);

canvas.addEventListener("mouseup", function(evt) {
	dragStart = null;
},false);

canvas.addEventListener("mouseout", function(evt) {
	dragStart = null;
},false);

canvas.addEventListener("wheel", handleScroll, false);

redraw();