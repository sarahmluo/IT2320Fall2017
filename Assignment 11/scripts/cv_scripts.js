var Sassy = {};

Sassy.canvas = document.getElementById("carousel");
Sassy.ctx = Sassy.canvas.getContext("2d");
Sassy.numImages = 6;
Sassy.spacing = 10;
Sassy.imgSize = 150;
Sassy.images = new Array();
Sassy.velocity = 0;
Sassy.mouseLeft = false;
Sassy.MX = Sassy.canvas.width/2;
Sassy.MY = 0;
Sassy.tol = 1e-10;
Sassy.highlightFactor = 1.10;

$("#index").html("Hover your mouse over the canvas area. If you hover left of center, <br />" +
					"the images will move left, and vice versa. The farther the cursor is <br />" +
					"from the center, the faster the images will move. When the cursor leaves <br />" +
					"the canvas, the images will gradually slow down and then stop.");

Sassy.pic = function(x, y, width, height, url){

	this.image = new Image();
	this.X = x;
	this.Y = y;
	this.width = width;
	this.height = height;
	this.image.src = url;
}

/* Initialize images and positions */
for (var i = 0; i < Sassy.numImages; i++){
	Sassy.images[i] = new Sassy.pic(Sassy.spacing*(i+1) + (Sassy.imgSize)*i, Sassy.spacing, Sassy.imgSize, Sassy.imgSize, "images/img" + (i+1) + ".png");
}


Sassy.MouseLeave = function(event){

	Sassy.mouseLeft = true;
}

Sassy.canvas.onmousemove = function(event){

	Sassy.mouseLeft = false;
	
	if (event.offsetX)
	{
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}
	else if (event.layerX)
	{
		mouseX = event.layerX;
		mouseY = event.layerY;
	}
	
	Sassy.MX = mouseX;
	Sassy.MY = mouseY;
}

Sassy.calculateVelocity = function(x,y){

	if(Sassy.mouseLeft){
		if(Math.abs(Sassy.velocity) < Sassy.tol){
			Sassy.velocity = 0;
		}
		else if(Sassy.velocity > 0){
			Sassy.velocity -= .01;
		}
		else{
			Sassy.velocity += .01;
		}
	}
	else if(!Sassy.mouseLeft){
		var a = Sassy.canvas.width/2;
		var b = Sassy.canvas.width;
		var vel = 3*(x-a)/(b-a);

		Sassy.velocity = Math.round(vel*100)/100;
	}
	
}

Sassy.updateImagePositions = function(){
	
	for(var i = 0; i < Sassy.images.length; i++){
		Sassy.images[i].X = Sassy.images[i].X + Sassy.velocity;
		// If an image is completely off the edge of the canvas, wrap it to the other side
		
		// Check for off the left edge
		if(Sassy.images[i].X + Sassy.images[i].width < 0 && Sassy.velocity < 0){
			// if it's the first image, set it to be behind the last image
			if(i == 0){
				Sassy.images[i].X = Sassy.images[Sassy.images.length-1].X + Sassy.images[Sassy.images.length-1].width + Sassy.spacing;
			}
			else{
				Sassy.images[i].X = Sassy.images[i-1].X + Sassy.images[i-1].width + Sassy.spacing;
			}
		}
		
		// Check for off the right edge
		if(Sassy.images[i].X > Sassy.canvas.width && Sassy.velocity > 0){
			// if it's the last image, set it to be in front of the first image
			if(i == Sassy.images.length-1){
				Sassy.images[i].X = Sassy.images[0].X - Sassy.images[0].width - Sassy.spacing;
			}
			else{
				Sassy.images[i].X = Sassy.images[i+1].X - Sassy.images[i+1].width - Sassy.spacing;
			}
		}
	}
	
}

Sassy.drawPics = function(){

	var indexOfCenterImage = Sassy.checkHighlight();
	
	for (var i = 0; i < Sassy.numImages; i++){
		if(i == indexOfCenterImage){
			var x = Sassy.images[i].X + Math.round(((1-Sassy.highlightFactor)*Sassy.images[i].width)/2);
			var y = Sassy.images[i].Y + Math.round(((1-Sassy.highlightFactor)*Sassy.images[i].height)/2);
			Sassy.ctx.drawImage(Sassy.images[i].image, x, y, Sassy.highlightFactor*Sassy.images[i].width, Sassy.highlightFactor*Sassy.images[i].height);
		}
		else{
			Sassy.ctx.drawImage(Sassy.images[i].image, Sassy.images[i].X, Sassy.images[i].Y);
		}
	}
	
}

Sassy.checkHighlight = function(){
	
	var center = Sassy.canvas.width/2;
	
	for (var i = 0; i < Sassy.images.length; i++){
		if(center - Sassy.images[i].X > 0 &&  center - Sassy.images[i].X < Sassy.images[i].width){
			return i;
		}
	}
	
	return -1;
}

Sassy.Animate = function(){

	Sassy.ctx.clearRect(0, 0, Sassy.canvas.width, Sassy.canvas.height);

	Sassy.calculateVelocity(Sassy.MX,Sassy.MY);
	Sassy.updateImagePositions();
	Sassy.drawPics();
	document.getElementById("velocity").innerHTML = "Velocity: " + Sassy.velocity;
	
	requestAnimFrame(function() { Sassy.Animate(); });

}


window.requestAnimFrame = (function(callback)
{
	return window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

$(document).ready(function()
{
	Sassy.Animate();
	Sassy.canvas.addEventListener("mouseleave", function(mouseEvent) { Sassy.MouseLeave(mouseEvent); });
});