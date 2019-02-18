$(function() {
	
	playeridviagps = 0;
	playeridviagps = $("#gameplayerid").val();
	
	playerrole = 0;
	playerrole = $("#gameplayerrole").val();
	
	gamematchid = 0;
	gamematchid = $("#gamematchid").val();
	
	if(playerrole != 1) {
		$("#mapdiv").css("width", "100vw");
		$("#mapdiv").css("height", "100vw");
	}
	
	var startP2 = 0;
				var changeableMarkerP2 = 0;
				
				var winner = 0;
				
					map = new OpenLayers.Map("mapdiv");
					map.addLayer(new OpenLayers.Layer.OSM());
										
					var latitude = 51.993669;
					latitude =  parseFloat($(".hiddenLat").val());
					var longitude = 9.837611;
					longitude = parseFloat($(".hiddenLon").val());

					var lonLat = new OpenLayers.LonLat( longitude, latitude )
					.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
									  
					var zoom=18;

					var markers = new OpenLayers.Layer.Markers( "Markers" );
					//map.addLayer(markers);
					
					var changeableMarker = new OpenLayers.Marker(lonLat);
					//markers.addMarker(changeableMarker);
							
					map.setCenter (lonLat, zoom);		
					
					minusOneSec = navigator.geolocation.getCurrentPosition(
						function(position){ // Position konnte bestimmt werden
							latitude = position.coords.latitude; 
							longitude = position.coords.longitude;
							
							lonLat = new OpenLayers.LonLat( longitude, latitude )
							.transform(
								new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
								map.getProjectionObject() // to Spherical Mercator Projection
							);
											  
							zoom=18;

							markers = new OpenLayers.Layer.Markers( "Markers" );
							map.addLayer(markers);
							
							changeableMarker = new OpenLayers.Marker(lonLat);
							//markers.addMarker(changeableMarker);
									
							map.setCenter (lonLat, zoom);
							$("#time").html( $("#gametime").val() );
							
							
							/*************************
							**************************
							* for testing purposes, **
							* set lat + 0.1, *********
							* otherwise I have *******
							* a catch*****************
							**************************
							*************************/
							//latitude += 0.1000000;
						}, 
						function(){ // Positionsbestimmung gescheitert
						},{enableHighAccuracy: true}
					);
					
					var latitudeP2 = 0;
					var longitudeP2 = 0;

					

					//showSecondPlayer();		

					
					// get number of players
					var numberofplayers = 1;
					numberofplayers = checkPlayerCount();
					
					function checkPlayerCount() {
						playerCountMatchid = 1;
						playerCountMatchid = $("#gamematchid").val();
						
						url = 'https://platinpanda.com/bsc/gpsconnector.php';

						$.post(

							url,

							{ "playerCountMatchid": playerCountMatchid },

							function(data) {

								numberofplayers = data;

							}, 

							"json"
						);

					}

					// show other players
					var startP3 = new Array();
					var changeableMarkerP3 = new Array();
					var latitudeP3 = new Array();
					var longitudeP3 = new Array();
					for(i=0; i< numberofplayers; i++) {
						startP3[i] = 0;
						changeableMarkerP3[i] = 0;
						latitudeP3[i] = 0;
						longitudeP3[i] = 0;
					}
					var lonLatP3 = new OpenLayers.LonLat( longitudeP3[0], longitudeP3[0] )
					.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
					
												
					$('#upleft').click(function() {
						latitude += 0.00005;	
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
	
						// see https://stackoverflow.com/questions/32002366/javascript-disable-the-click-event-for-1-second-after-an-id-is-clicked
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#left').click(function() {
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#downleft').click(function() {
						latitude -= 0.00005;	
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#up').click(function() {
						latitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						// let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay						
					});
					$('#down').click(function() {
						latitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#upright').click(function() {
						latitude += 0.00005;	
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#right').click(function() {
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);
						 // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					$('#downright').click(function() {
						latitude -= 0.00005;	
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1); // let a common class(disable-btn) for each button which should be disabled for on second
						$('.disable-btn').prop('disabled',true);
						setTimeout(function(){
						   // enable click after 1 second
						   $('.disable-btn').prop('disabled',false);
						},500); // 0.5 second delay
					});
					
					function redrawMap(longitude, latitude, playerid, playerrole) {
					
						if(playerrole == 1) {
							markers.removeMarker(changeableMarker);
							lonLat = new OpenLayers.LonLat( longitude, latitude )
							.transform(
								new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
								map.getProjectionObject() // to Spherical Mercator Projection
							);
											  
							zoom=18;

							//markers = new OpenLayers.Layer.Markers( "Markers" );
							map.addLayer(markers);
							
							changeableMarker = new OpenLayers.Marker(lonLat);
							markers.addMarker(changeableMarker);
							
							url = 'https://platinpanda.com/bsc/gpsconnector.php';
							userid = playerid;
							
							var dt = new Date();
							var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					
							$.post(

									url,

									{ "time": time, "longitude": longitude, "latitude": latitude, "userid": userid },

									function(data) {
	   
											/*latitudeP2 = data[0];
											longitudeP2 = data[1];*/
										chechForStreet();
									}, 

							"json"
							);
							map.setCenter (lonLat, zoom);
							
							// check whether the bandit was caught
							checkGameEnd();
							
							if(winner < 1) {
								//showSecondPlayer();
								redrawMapOthers();
							}
						
						} else {
							markers.removeMarker(changeableMarkerP2);
							
							// back up the values
							buLat2 = latitudeP2;
							buLon2 = longitudeP2;
							
							// set the new values
							latitudeP2 = latitude;
							longitudeP2 = longitude;
							
							if(latitudeP2 != 0 && longitudeP2 != 0) {
								
								lonLatP2 = new OpenLayers.LonLat( longitudeP2, latitudeP2 )
								.transform(
									new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
									map.getProjectionObject() // to Spherical Mercator Projection
								);
								changeableMarkerP2 = new OpenLayers.Marker(lonLatP2);
								markers.addMarker(changeableMarkerP2);
								
								url = 'https://platinpanda.com/bsc/gpsconnector.php';
								userid = playeridviagps;
								
								var dt2 = new Date();
								var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
						
								$.post(

										url,

										{ "time": time2, "longitude": longitudeP2, "latitude": latitudeP2, "userid": userid },

										function(data) {

										}, 

								"json"
								);
							}
							
							// restore the backedup values
							latitudeP2 = buLat2;
							longitudeP2 = buLon2;
							
							// check whether the bandit was caught
							checkGameEnd();
						}
						
					}
					
					var size = new OpenLayers.Size(21,25);
					var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
					var icon = new OpenLayers.Icon('img/marker.png', size, offset);
					var bucm3 = 0;
					function redrawMapOthers() {

								url = 'https://platinpanda.com/bsc/gpsconnector.php';
								
									// get playerids
									$.post(

										url,

										{ "getplayerids": gamematchid },

										function(data) {
											idArr = new Array();
											for(j=0; j<data[2].length; j++) {

												latitudeP3[j] = parseFloat(data[0][j]);
												longitudeP3[j] = parseFloat(data[1][j]);
												idArr[j] = parseFloat(data[2][j]);

												if(idArr[j] != playeridviagps) {
													if(startP2 != 0) {
														markers.removeMarker(changeableMarkerP3[j]);
													}
													lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
													.transform(
														new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
														map.getProjectionObject() // to Spherical Mercator Projection
													);
												
													 icon = new OpenLayers.Icon('img/yellow.png', size, offset);

													changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
													markers.addMarker(changeableMarkerP3[j]);
													
													// check whether the bandit was caught
													checkGameEnd();
												} else {
													if(startP2 == 0) {

														if(changeableMarkerP3[j]) {
															bucm3 = changeableMarkerP3[j];
														}
														lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
															.transform(
																new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
																map.getProjectionObject() // to Spherical Mercator Projection
															);
															changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j]);
															markers.removeMarker(changeableMarkerP3[j]);
															markers.addMarker(changeableMarkerP3[j]);
															if(bucm3 != 0) {
																markers.removeMarker(bucm3);
															}
													} else {
														markers.removeMarker(changeableMarkerP3[j]);
														url = 'https://platinpanda.com/bsc/gpsconnector.php';
														userid = playeridviagps;
														
														var dt = new Date();
														var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
														
														nottheactive = 1;
												
														$.post(

																url,

																{ "userid": userid, "nottheactive": nottheactive },

																function(data) {
								   
																	if(playerrole != 1) {
																		latitudeP2 = parseFloat(data[0]);
																		longitudeP2 = parseFloat(data[1]);
																	}
																}, 

														"json"
														);
														markers.removeMarker(changeableMarkerP3[j]);
														
														minusOneSec = navigator.geolocation.getCurrentPosition(
															function(position){ // Position konnte bestimmt werden
																latitudeP3[j] = position.coords.latitude;
																longitudeP3[j] = position.coords.longitude;
																//var accuracy = position.coords.accuracy+'m';
																//redrawMap(longitudeP3[j], latitudeP3[j], playeridviagps, playerrole);
																//markers.removeMarker(changeableMarkerP3[j]);

																
																if(latitudeP3[j] != 0 && longitudeP3[j] != 0) {
																	if(changeableMarkerP3[j]) {
																		bucm3 = changeableMarkerP3[j];
																	}
																	lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
																	.transform(
																		new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
																		map.getProjectionObject() // to Spherical Mercator Projection
																	);
																	
																	icon = new OpenLayers.Icon('img/marker.png', size, offset);
																	changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
																	markers.removeMarker(changeableMarkerP3[j]);
																	if(playerrole != 1) {
																		markers.addMarker(changeableMarkerP3[j]);
																	}
																	
																	url = 'https://platinpanda.com/bsc/gpsconnector.php';
																	userid = playeridviagps;
																	
																	var dt2 = new Date();
																	var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
															
																	$.post(

																			url,

																			{ "time": time2, "longitude": longitudeP3[j], "latitude": latitudeP3[j], "userid": userid },

																			function(data) {
																				
																			}, 

																	"json"
																	);
																	
																}
																if(bucm3 != 0) {
																	markers.removeMarker(bucm3);
																}
																// restore the backedup values
																latitudeP3[j] = latitudeP2;
																longitudeP3[j] = longitudeP2;
																
																// check whether the bandit was caught
																checkGameEnd();
																
																
																/*
																*
																IRGENDWO HOER ZIEHT ER MARKER NACH
																*
																*/
																
															}, 
															function(){ // Positionsbestimmung gescheitert
															},{enableHighAccuracy: true}
														);
														markers.removeMarker(changeableMarkerP3[j]);
													}
												}
												
											}
											startP2 = 1;
										}, 

									"json"
									);

					}
					
					interval = setInterval(function() {
						if(winner == 0) {

							//for(i=0; i<numberofplayers; i++) {
							//	showSecondPlayer();
						//	}
						
						if(numberofplayers > 1) {
							redrawMapOthers();
						}
							
							/*if(playeridviagps != 1) {
								updateViaGPS();
							}*/
						}
					}, 1000);
					
					/*function showSecondPlayer() {
						if(startP2 == 0) {
							/*minusOneSec = navigator.geolocation.getCurrentPosition(
								function(position){ // Position konnte bestimmt werden
									latitudeP2 = position.coords.latitude; 
									longitudeP2 = position.coords.longitude;
									//var accuracy = position.coords.accuracy+'m';
									redrawMap(longitude, latitude);	
								}, 
								function(){ // Positionsbestimmung gescheitert
								},{enableHighAccuracy: true}
							);
							lonLatP2 = new OpenLayers.LonLat( longitudeP2, latitudeP2 )
								.transform(
									new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
									map.getProjectionObject() // to Spherical Mercator Projection
								);
								changeableMarkerP2 = new OpenLayers.Marker(lonLatP2);
								markers.addMarker(changeableMarkerP2);
								markers.removeMarker(changeableMarkerP2);
							startP2 = 1;
						} else {
							
							url = 'https://platinpanda.com/bsc/gpsconnector.php';
							userid = playeridviagps;
							
							var dt = new Date();
							var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
							
							nottheactive = 1;
					
							$.post(

									url,

									{ "userid": userid, "nottheactive": nottheactive },

									function(data) {
	   
											latitudeP2 = parseFloat(data[0]);
											longitudeP2 = parseFloat(data[1]);

									}, 

							"json"
							);
							markers.removeMarker(changeableMarkerP2);
							redrawMap(longitudeP2, latitudeP2, playeridviagps, 2);
						}
					}*/
					
					function checkGameEnd() {
						latDiff = 1;
						latDiff = Math.abs(latitude - latitudeP2);
						
						lonDiff = 1;
						lonDiff = Math.abs(longitude - longitudeP2);
						
						url = 'https://platinpanda.com/bsc/gpsconnector.php';
													
						checkForWin = 1;
					
						$.post(

							url,

							{ "checkForWin": checkForWin, "matchid": gamematchid },

							function(data) {
	   
								if(data == 'y') {
									alert('Die Detektive siegen!');
									winner = 1;
									history.go(-3);
									navigator.app.backHistory();
								}
								
								remainingTime = document.querySelector('#time').innerHTML;

								if(remainingTime == '00:00') {
									alert('Der Bandit gewinnt!');
									winner = 1;
									history.go(-3);
									navigator.app.backHistory();
								}

							}, 
							"json"
						);

					/*	if(latDiff < 0.000001 && lonDiff < 0.000001) {
							alert('Die Detektive siegen!');
							winner = 1;
							history.go(-3);
							navigator.app.backHistory();
						}
						
						remainingTime = document.querySelector('#time').innerHTML;

						if(remainingTime == '00:00') {
							alert('Der Bandit gewinnt!');
							winner = 1;
							history.go(-3);
							navigator.app.backHistory();
						}*/
						
						return winner;
					}
					
					
					var firstSec = 0;
					
					function updateViaGPS() {
					
						markers.removeMarker(changeableMarkerP2);
					
						minusOneSec = navigator.geolocation.getCurrentPosition(
							function(position){ // Position konnte bestimmt werden
								latitudeP2 = position.coords.latitude;
								longitudeP2 = position.coords.longitude;
								//var accuracy = position.coords.accuracy+'m';
								redrawMap(longitudeP2, latitudeP2, playeridviagps, 2);
							}, 
							function(){ // Positionsbestimmung gescheitert
							},{enableHighAccuracy: true}
						);

					}
					var map2 = L.map('mapdiv').setView([latitude, longitude], 18);
					 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors</a>'
      }).addTo(map2);
					function buildOverpassApiUrl(map2, overpassQuery) {
        var bounds = map2.getBounds().getSouth() + ',' + map2.getBounds().getWest() + ',' + map2.getBounds().getNorth() + ',' + map2.getBounds().getEast();
        var nodeQuery = 'node[' + overpassQuery + '](' + bounds + ');';
        var wayQuery = 'way[' + overpassQuery + '](' + bounds + ');';
        var relationQuery = 'relation[' + overpassQuery + '](' + bounds + ');';
        var query = '?data=[out:json][timeout:15];(' + nodeQuery + wayQuery + relationQuery + ');out body geom;';
        var baseUrl = 'http://overpass-api.de/api/interpreter';
        var resultUrl = baseUrl + query;
		console.log(resultUrl);
        return resultUrl;
      }
					
									var queryTextfieldValue = 'highway';
        var overpassApiUrl = buildOverpassApiUrl(map2, queryTextfieldValue);
        function chechForStreet() {map2.off();
map2.remove();map2 =L.map('mapdiv').setView([latitude, longitude], 18);
        $.get(overpassApiUrl, function (osmDataAsJson) {
          var resultAsGeojson = osmtogeojson(osmDataAsJson);		  
		  
		  var features = [];

features = resultAsGeojson.features[0].geometry.coordinates;
		var istdrinne = 0;
	  var coordArr = [];
	  var lonarr = [];
	  var latarr = [];
	  
	  var ilength = resultAsGeojson.features.length;
	  
	/*  latitudeBounds = latitude + 0.001;
	  latitudeBoundsLower = latitude - 0.001;
	  longitudeBounds = longitude + 0.001;
	  longitudeBoundsLower = longitude - 0.001;
	  for(i=0; i<ilength; i++) {
		coordArr.push(features = resultAsGeojson.features[0].geometry.coordinates[i]);
		latarr.push(coordArr[i][1]);
		lonarr.push(coordArr[i][0]);
		
		if((latarr[i] >= latitudeBoundsLower) && (lonarr[i] >= longitudeBoundsLower) && (latarr[i] <= latitudeBounds && (lonarr[i] <= longitudeBounds))) {
			istdrinne = 1;
		}
		console.log(latarr[i] + ' ' + latitude);
		console.log(lonarr[i] + ' ' + longitude);
	  }*/
	  
	for(i=0; i<ilength; i++) {
		  
		lengthHere = resultAsGeojson.features[i].geometry.coordinates.length;

		for(k=0; k<=lengthHere; k++) {
			
			coordArr.push(features = resultAsGeojson.features[i].geometry.coordinates[k]);

			if(coordArr[k]) {
				latarr.push(coordArr[k][1]);
				lonarr.push(coordArr[k][0]);

			
			
			} else {
if(k != lengthHere) {				
				k--;
				lonarr.sort();
				latarr.sort();
				
				latarr[k] = parseFloat(latarr[k]);
				lonarr[k] = parseFloat(lonarr[k]);
				
				latmin = latarr[k] - 0.001;
				latmax = latarr[k] + 0.001
				lonmin = lonarr[k] - 0.0015;
				lonmax = lonarr[k] + 0.0015;
				
				controlsForCachingError = 0;// JEDEN ANBSCHNITT EINZELN ABFRAGEN
				if((latitude >= latmin) && (longitude >= lonmin) && (latitude <= latmax && (longitude <= lonmax))) {
					console.log('hier');
					console.log(latarr[k]);
					console.log(lonarr[k]);
					console.log(latitude);
					console.log(longitude);
					controlsForCachingError++;

					if(controlsForCachingError > 1) {
						istdrinne = 0;
					} else {
						istdrinne = 1;
					}
				}
				coordArr = [];
				lonarr = [];
				latarr = [];
				k = lengthHere;
}
			}
			
		}

	}
	  
			  /*51.726530, 9.982846
				 
		var found = features.find(function(element) {
		  return element > 9.85;
		});

		console.log(features);
		console.log(coordArr);*/
		console.log(istdrinne+' drinne');
				
		});
		}
				});
				
				/*$.ajax({
    url:
        'https://www.overpass-api.de/api/interpreter?data=' + 
        '[out:json][timeout:60];' + 
        'area["boundary"~"administrative"]["name"~"Berlin"];' + 
        'node(area)["amenity"~"school"];' + 
        'out;',
    dataType: 'json',
    type: 'GET',
    async: true,
    crossDomain: true
}).done(function() {
    console.log( "second success" );
}).fail(function(error) {
    console.log(error);
    console.log( "error" );
}).always(function() {
    console.log( "complete" );
});*/
