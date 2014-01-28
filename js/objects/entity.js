
//======================== E N T I T Y ========================//


function Entity(){

	// Create basic stuff
	this.atts 	= {};
	this.ctrls 	= {};
	this.stats 	= {};
	this.p 		= {};

	// Set inits for entities
	this.inits = [];

	this.inits.push({
		handle: 'giveImage',
		order: 100,
		func: function(){
			this.image.img 			= new Image();
			this.image.img.ready 	= false;
			this.image.img.onload 	= function() { this.ready = true; }
			this.image.img.src 		= this.image.src;
		}

	});

	this.inits.push({    // may be able to die because stuff will have its own "spawn" functions that do this
		handle: 'activate',
		order: 120,
		func: function(){
			this.stats.active = true;
		},
	});

	this.inits.push({
		handle: 'register',
		order: 0,
		func: function(){
			registries.entities.push(this);
		},
	});


};

Entity.prototype.init = function(){

	this.inits.sort(  function(a,b){return a.order - b.order;}  );

	for (var i=0; i<this.inits.length; i++){
		this.inits[i].func.apply(this);
	}

};

Entity.prototype.draw = function(){
	
		ctx.translate(+1*this.p.x, +1*this.p.y)
		ctx.rotate(+1*this.p.direction);
		ctx.translate(-this.image.width/2, -this.image.height/2)
		ctx.drawImage(this.image.img, 0, 0);
		ctx.setTransform(1,0,0,1,0,0); // (scaleX, skewX, skewY, scaleY, translateX, translateY);

};