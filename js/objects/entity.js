
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

	this.inits.push({
		handle: 'giveMarker',
		order: 101,
		func: function(){
			this.marker = new L.marker([44.9120038,-93.2663044], {
				icon: new L.icon({
					iconUrl: this.image.src,
					iconSize: [5,5]
				})
			});
			var that=this;
			setTimeout(function(){
				that.marker.addTo(lMap);
			},0);
		}

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

Entity.prototype.draw = function(viewPoint){
	
		ctx.translate(+1*this.p.x - viewPoint.x + window.innerWidth / 2, +1*this.p.y - viewPoint.y + window.innerHeight / 2)
		ctx.rotate(+1*this.p.direction);
		ctx.translate(-this.image.width/2, -this.image.height/2)
		ctx.drawImage(this.image.img, 0, 0);
		ctx.setTransform(1,0,0,1,0,0); // (scaleX, skewX, skewY, scaleY, translateX, translateY);

		this.marker.setLatLng(this.getLatLng());
		this.marker.setRotationAngle(this.p.direction);

};

Entity.prototype.getLatLng = function(){
	return latLngFromXY([this.p.x,this.p.y]);
}

function latLngFromXY(x,y){
	if (x.length){
		y = x[1];
		x = x[0];
	}
	var scale = 1/50000;
	var lat = homeLat - (y * scale);
	var lng = homeLng + (x * scale) / Math.cos(homeLng) ; // should use "lng" but that'd be circular; may need to if using actual geo stuff later.
	return [lat,lng];
}