"use strict";

let activeDragControl;

$(canvas).mousemove( (event) => {
	mouseX = event.offsetX || (event.pageX - canvas.offsetLeft);
	mouseY = event.offsetY || (event.pageY - canvas.offsetTop);
	mousePositionX.innerHTML = mouseX;
	mousePositionY.innerHTML = mouseY;
	// dragged = true;
	if (dragged){
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
	if(isNaN(translatePos.x)) {
		translatePos.x = 0;
		translatePos.y = 0;
	}

	if(lastX<originX) {
		// console.log('douleuei1');
		dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
		dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
		dragged = true;
	}else if(lastY<originY) {
		// console.log('douleuei2');
		dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
		dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
		dragged = true;
	}else if(lastX>originWidth) {
		// console.log('douleuei3');
		dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
		dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
		dragged = true;
	}else if(lastY>originHeight) {
		// console.log('douleuei4');
		dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
		dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
		dragged = true;
	}else{
		console.log('den ginetai drag');
	} 

	// dragStart = {
	// 	x: 0,
	// 	y: 0
	// } 
	// dragStart.x = lastX - translatePos.x;// - translatePos.x;//(translatePos.x*scaleFactor);
	// dragStart.y = lastY - translatePos.y;// - translatePos.y;//(translatePos.y*scaleFactor);
},false);

canvas.addEventListener("mouseup", function(evt) {
	dragged = false;

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
	dragged = false;
	// gia ta drag controls
	if(activeDragControl) {
		$(topControl).show();
		$(leftControl).show();
		$(rightControl).show();
		$(bottomControl).show();
		activeDragControl = null;
	}
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
		dragged = true;
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