'use strict';
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

	var shadowSizeModifier 	= 0.15;
	var iconOpacity 		= 0.6;

	this.inits.push({
		handle: 'giveShadowMarker',
		order: 101,
		func: function(){
			this.marker = new L.marker([44.9120038,-93.2663044], {
				icon: new L.icon({
					iconUrl: this.shadowIcon.src,
					iconSize: [this.shadowIcon.width * shadowSizeModifier, this.shadowIcon.height * shadowSizeModifier]
				}),
				opacity: iconOpacity
			});
			var that=this;
			var tryToAddToLmap = function() {
				if ('undefined' != typeof lMap) {
					that.marker.addTo(lMap);
				} else {
					setTimeout(function(){ // eventually I'd have some better async stuff making these settimeouts not needed
						tryToAddToLmap();
					},1000);
				}
			}
			tryToAddToLmap();

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
		var newAngle = (360/(2*3.14)) * this.p.direction;
		this.marker.setRotationAngle( newAngle );
		// console.log(newAngle);

};

Entity.prototype.getLatLng = function(){
	return latLngFromXY([this.p.x,this.p.y]);
}

Entity.prototype.remove = function(){	
	lMap.removeLayer(this.marker);
	for ( var registryName in registries ) {
		registries[registryName].splice(1, registries[registryName].indexOf(this) );
	} 
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