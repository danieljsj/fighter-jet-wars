'use strict';









		// WHOAH - this is for the map!
		// this.marker.setLatLng(this.getLatLng());
		// var newAngle = (360/(2*3.14)) * this.p.direction;
		// this.marker.setRotationAngle( newAngle );









/**
 * @ngdoc service
 * @name angularfireApp.LeafletMapService
 * @description
 * # LeafletMapService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('LeafletMapService', function (/*L <-- for leaflet... might not need this; maybe just makes it a global... which I guess I can be fine with, right? kinda like how I'm using Firebase as a global also here? */) {
    // AngularJS will instantiate a singleton by calling "new" on this function

		var fallbackHomeLat = 44.9374744;
		var fallbackHomeLng = -93.0862457;

		var lMap;
		var homeLat;
		var homeLng;



    	function initMap(mapHtmlId){

			if ("geolocation" in navigator) {
			  	/* geolocation is available */
				navigator.geolocation.getCurrentPosition(
					// TODO: make the whole app start once location is found
					function(position) {
					  homeLat = position.coords.latitude; 
					  homeLng = position.coords.longitude;
					  initMapNow(mapHtmlId);
					},
					function error(err) {
					  console.warn('getCurrentPosition ERROR(' + err.code + '): ' + err.message);
					  homeLat = fallbackHomeLat; 
					  homeLng = fallbackHomeLng;
					  initMapNow(mapHtmlId);
					}
				);
			} else {
			  	/* geolocation IS NOT available */
				homeLat = 44.8847554; homeLng = -93.2222846;
				initMapNow(mapHtmlId);
			}
    	
    	}


		function initMapNow(mapHtmlId){
			lMap = L.map(mapHtmlId).setView([homeLat, homeLng], 13);
			
			L.marker([homeLat, homeLng], {icon: L.icon({iconUrl: 'http://www.iconarchive.com/download/i85581/graphicloads/100-flat/home.ico', iconSize:[12,12]}) }).addTo(lMap);

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			    maxZoom: 18,
			    id: 'danieljsj.095ld7lm',
			    accessToken: 'pk.eyJ1IjoiZGFuaWVsanNqIiwiYSI6ImNpb3VnNnFtazAwcWZ0em01N2xzcGpwaDUifQ.2qEVaJ4R-TeXw4LxJzIJ-A'
			}).addTo(lMap);

		}


		return {
			initMap: initMap,
		}


  });
