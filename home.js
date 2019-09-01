"use strict"; //den 8umamai ti kanei

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

let scaleFactor = 1;
//den ta xrhsimopoiw akoma auta ta 4
let originX = 0;
let originY = 0;
let originWidth = 0;
let originHeight = 0;

let lastX = 0;
let lastY = 0;
let mouseX = 0;
let mouseY = 0;
let dragged = 0;
let dragStart = 0;
let myLimit = 50;
let limitTop = myLimit;//0-myLimit;
let limitLeft = myLimit;//0-myLimit;
let limitBottom = canvas.height+myLimit;
let limitRight = canvas.width+myLimit;

let translatePos = {
    x: 0,
    y: 0
};

let mousePositionX = document.getElementById('mouseX');
let mousePositionY = document.getElementById('mouseY');

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
	ctx.fillStyle = 'red';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'black';
	ctx.fillRect(10,10,canvas.width-20,canvas.height-20);
	ctx.fillStyle = 'white';
	ctx.fillRect(250,250,100,100);
	ctx.font = "40px Georgia";
	ctx.fillStyle = 'green';
	ctx.fillText("Hello world!", 200, 200);
	// ctx.restore();
}

//diaxeirish otan ginetai scroll
function handleScroll(event) {
	if(event.deltaY == -3) { //zoom in
		if(scaleFactor < 2.5) {
			scaleFactor += 0.1;
			// scaleFactor = Math.floor(scaleFactor*10)/10;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
			console.log("translatePos.x: "+translatePos.x);
			console.log("translatePos.y: "+translatePos.y);
		}
	}else if(event.deltaY == 3) { //zoom out
		if(scaleFactor > 1) {
			scaleFactor -= 0.1;
			// scaleFactor = Math.floor(scaleFactor*10)/10;
			translatePos.x = mouseX;
			translatePos.y = mouseY;
			//edw logika 8a mpainei mia if ama 8elw na balw oria mallon
			zoom(scaleFactor, translatePos);
			translatePos.x = -((scaleFactor*translatePos.x)-translatePos.x);
			translatePos.y = -((scaleFactor*translatePos.y)-translatePos.y);
			console.log("translatePos.x: "+translatePos.x);
			console.log("translatePos.y: "+translatePos.y);
		}
	}
}

//diaxeirish gia to zoom
function zoom(scaleFactor, translatePos) {
	clearCanvas();
	ctx.save();
	ctx.translate(translatePos.x, translatePos.y);
	ctx.scale(scaleFactor,scaleFactor);
	ctx.translate(-translatePos.x, -translatePos.y); // giati eprepe na bazoume to anti8eto ? den douleue opws h8ela to zoom
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
	// ctx.translate(-translatePos.x, -translatePos.y); //auto eftiakse to problhma pou eixa me to zoom gia to drag
	redraw();
	console.log(translatePos.x);
	ctx.restore();
}

//o kwdika
function trackTransforms(x, y, w, h) {
	originX = x;
	originY = y;
	originWidth = w;
	originHeight = h;
}

$(canvas).mousemove( (event) => {
	mouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
	mouseY = event.offsetY || (event.pageY - canvas.offsetTop);
	mousePositionX.innerHTML = mouseX;
	mousePositionY.innerHTML = mouseY;
	dragged = true;
	if (dragStart){
		translatePos.x = mouseX-dragStart.x;
		translatePos.y = mouseY-dragStart.y;
		console.log('zero translate ' + translatePos.x);
		//auta einai ta oria gia na mhn afhnei aspra kena ston canvas
		//limitTop>translatePos.y && limitLeft>translatePos.x && limitRight<(translatePos.x+(scaleFactor*canvas.width)) && limitBottom<(translatePos.y+(scaleFactor*canvas.height))
		if(limitTop>translatePos.y && limitLeft>translatePos.x && limitRight<(translatePos.x+(scaleFactor*limitRight)) && limitBottom<(translatePos.y+(scaleFactor*limitBottom))) {
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitTop<=translatePos.y && limitLeft<=translatePos.x) { //an ksepernaei to panw kai to aristero orio
			translatePos.x = limitLeft;
			translatePos.y = limitTop;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);

		// se auto exw 8ema
		}else if(limitTop<=translatePos.y && limitRight>=(translatePos.x+(scaleFactor*limitRight))) { //an ksepernaei to panw kai to deksio orio
			translatePos.x = originX; //to eixa originX
			translatePos.y = originY;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitRight>=(translatePos.x+(scaleFactor*limitRight)) && limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) { //an ksepernaei to deksio kai to katw orio
			translatePos.x = -limitLeft;
			translatePos.y = limitTop;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom)) && limitLeft<=translatePos.x) { //an ksepernaei to katw kai to aristero orio
			translatePos.x = limitLeft;
			translatePos.y = originY;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitTop<=translatePos.y) { //an ksepernaei mono to panw orio
			translatePos.y = limitTop;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitLeft<=translatePos.x) { //an ksepernaei to aristero orio
			translatePos.x = limitLeft;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitRight>=(translatePos.x+(scaleFactor*canvas.width))) { //an ksepernaei to deksio orio
			console.log('first translateX '+translatePos.x);
			translatePos.x = originX;//-((scaleFactor*canvas.width)-canvas.width)/scaleFactor;
			console.log('second translateX '+translatePos.x);
			// console.log('translele ' + translatePos.x);
			// console.log('originX ' + originX);
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}else if(limitBottom>=(translatePos.y+(scaleFactor*limitBottom))) { //an ksepernaei to katw orio
			// translatePos.x = mouseX-dragStart.x;
			translatePos.y = originY;
			drag(translatePos);
			trackTransforms(translatePos.x, translatePos.y, 0, 0);
		}
		
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

	dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
	dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
	dragged = false;
},false);

canvas.addEventListener("mouseup", function(evt) {
	dragStart = null;
},false);

canvas.addEventListener("mouseout", function(evt) {
	dragStart = null;
},false);

canvas.addEventListener("wheel", handleScroll, false);

trackTransforms(0,0,canvas.width,canvas.height);
redraw();