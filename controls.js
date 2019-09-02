"use strict";

// let topControl = document.getElementById('top');
// let leftControl = document.getElementById('left');
// let rightControl = document.getElementById('right');
// let bottomControl = document.getElementById('bottom');
// let mouseX = 0;
// let mouseY = 0;
let activeDragControl;

$(canvas).mousemove( (event) => {
	mouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
	mouseY = event.offsetY || (event.pageY - canvas.offsetTop);
	mousePositionX.innerHTML = mouseX;
	mousePositionY.innerHTML = mouseY;
	dragged = true;
	if (dragStart){
		dragControl();
	}

	if(activeDragControl) {
		$(topControl).hide();
		$(leftControl).hide();
		$(rightControl).hide();
		$(bottomControl).hide();

		dragControl();
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

	// gia ta drag controls
	if(activeDragControl) {
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
},false);

canvas.addEventListener("mouseout", function(evt) {
	dragStart = null;
},false);

canvas.addEventListener("mouseover", function(evt) {
	if(activeDragControl) {
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
	}
},false);

canvas.addEventListener("wheel", handleScroll, false);











//ftiaxnw prwta thn ulopoihsh gia to top kai meta gia ta alla
topControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
});

topControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - topControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - topControl.offsetTop);
	$(this).hide();
	activeDragControl = "top";
});

leftControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);	
});

leftControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - leftControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - leftControl.offsetTop);
	$(this).hide();
	activeDragControl = " left";
});

rightControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
});

rightControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - rightControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - rightControl.offsetTop);
	$(this).hide();
	activeDragControl = "right";

});

bottomControl.addEventListener('mousemove', function(event) {
	mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
});

bottomControl.addEventListener('mousedown', function(event) {
	event.preventDefault();
	mouseX = event.offsetX || (event.pageX - bottomControl.offsetLeft);
	mouseY = event.offsetY || (event.pageY - bottomControl.offsetTop);
	$(this).hide();
	activeDragControl = "bottom";
});
