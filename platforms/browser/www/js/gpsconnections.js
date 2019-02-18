$(function() {
	
	var url = 'https://platinpanda.com/bsc/gpsconnector.php';
	
	playeridviagps = 0;
	playeridviagps = $("#gameplayerid").val();
	
	var playerrole = 0;
	playerrole = $("#gameplayerrole").val();
	
	gamematchid = 0;
	gamematchid = $("#gamematchid").val();
	
	gamemode = 0;
	gamemode = $("#gamemode").val();
	
	if(playerrole != 1) {
		$("#mapdiv").css("width", "100vw");
		$("#mapdiv").css("height", "20vw");
		$("#sound-off").hide();
	} else {
		$("#arButton").hide();
		$("#sound-on").hide();
		$("#sound-off").hide();
		$("#cellsite").hide();
		$("#gameHints").hide();
		$('#flaregun').hide();
		$("#disguiseButton").show();
		$("#sprintButton").show();
		$("#controls input").show();
	}
	
	var checkallready = 0;
	
	var startP2 = 0;
	var changeableMarkerP2 = 0;
				
	var winner = 0;
				
	var map = new OpenLayers.Map("mapdiv");
	map.addLayer(new OpenLayers.Layer.OSM());
										
	var latitude = 51.993669;
	latitude = $(".hiddenLat").val();
	var longitude = 9.837611;
	longitude = $(".hiddenLon").val();

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
	
	// check for disguise of the bandit
	var disguise = 0;
	var disguiseRecover = 0;
	$('#disguiseButton').click(function() {
		disguise = 10;
		disguiseRecover = 180;
		$('#disguiseButton').hide();
		return false;
	});
					
	getCurrentPosition = navigator.geolocation.getCurrentPosition(
		function(position){ // Position konnte bestimmt werden
			latitude = position.coords.latitude; 
			longitude = position.coords.longitude;
							
			lonLat = new OpenLayers.LonLat( longitude, latitude )
			.transform(
				new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
				map.getProjectionObject() // to Spherical Mercator Projection
			);
											  
			zoom=18;
							
			if(playerrole == 1) {
				// let the bandit choose his starting spot
				map.events.register("click", map, function getBanditCoords(e) {     
					var point = map.getLonLatFromPixel( this.events.getMousePosition(e) );
					map.events.unregister('click', map, getBanditCoords);
					var toProjection = new OpenLayers.Projection("EPSG:4326");
					var positionClicks = map.getLonLatFromPixel(e.xy).transform(map.getProjectionObject(), toProjection);

					longitude = positionClicks.lon, 
					latitude = positionClicks.lat;
					lonLat = new OpenLayers.LonLat( longitude, latitude )
					.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
					markers = new OpenLayers.Layer.Markers( "Markers" );
			
					changeableMarker = new OpenLayers.Marker(lonLat);
											
					map.setCenter (lonLat, zoom);

					playerready = 1;
					$('#controls').show();
					redrawMap(longitude, latitude, playeridviagps, 1);
					$.post(

						url,

						{ "playerready": playerready, "matchidready": gamematchid },

						function(data) {
							
						}, 

						"json"
					);

				});
				
				map.events.register("touchstart", map, function getBanditCoords(e) {     
					var point = map.getLonLatFromPixel( this.events.getMousePosition(e) );
					map.events.unregister('touchstart', map, getBanditCoords);
					var toProjection = new OpenLayers.Projection("EPSG:4326");
					var positionClicks = map.getLonLatFromPixel(e.xy).transform(map.getProjectionObject(), toProjection);

					longitude = positionClicks.lon, 
					latitude = positionClicks.lat;
					lonLat = new OpenLayers.LonLat( longitude, latitude )
					.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
					markers = new OpenLayers.Layer.Markers( "Markers" );
			
					changeableMarker = new OpenLayers.Marker(lonLat);
											
					map.setCenter (lonLat, zoom);

					playerready = 1;
					$('#controls').show();
					redrawMap(longitude, latitude, playeridviagps, 1);
					$.post(

						url,

						{ "playerready": playerready, "matchidready": gamematchid },

						function(data) {
							
						}, 

						"json"
					);

				});
			
			} else {
				
				playerready = 1;

				$.post(

					url,

					{ "playerready": playerready, "matchidready": gamematchid },

					function(data) {
	
					}, 

					"json"
				);
				
			}

		}, 
		function(){ // Positionsbestimmung gescheitert
		},{enableHighAccuracy: true}
	);
					
	var latitudeP2 = 0;
	var longitudeP2 = 0;

	// get number of players
	var numberofplayers = 1;
	numberofplayers = checkPlayerCount();
					
	function checkPlayerCount() {
		playerCountMatchid = 1;
		playerCountMatchid = $("#gamematchid").val();

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
		
	// allow the bandit a short sprint (double speed)
	var sprintReady = 0;
	var sprintRecover = 0;
	$('#sprintButton').click(function() {
		sprintReady = 10;
		sprintRecover = 120;
		$('#sprintButton').hide();
		return false;
	});
	
	
	// allow the detectives to send a signal with a flare gun
	var flareAmmo = 0;
	var flareCounter = -1;
	$('#flaregun').click(function() {
		$('body').css("cursor", "crosshair");
		//markers.addMarker(changeableMarkerP3[j]);
		$('#flaregun').hide();
		flareAmmo++;
		
		if(flareAmmo == 1) {
		//	$('#mapdiv').mouseover(function(event) {
			map.events.register("click", map, function getSignalCoords(e) {            
				var point = map.getLonLatFromPixel( this.events.getMousePosition(e) );     
				
				map.events.unregister('click', map, getSignalCoords);
				$('body').css("cursor", "pointer");

				flareAmmo = 0;
				showFlare(point.lon, point.lat);

			});
			
			map.events.register("touchstart", map, function getSignalCoords(e) {            
				var point = map.getLonLatFromPixel( this.events.getMousePosition(e) );     
				
				map.events.unregister('touchstart', map, getSignalCoords);
				$('body').css("cursor", "pointer");

				flareAmmo = 0;
				showFlare(point.lon, point.lat);

			});
		}
		
		return false;
	});
	
	
	// show the Bandit based on a cell site analysis
	var cellSiteAnalysis = 0;
	$('#cellsite').click(function() {

		//markers.addMarker(changeableMarkerP3[j]);
		$('#cellsite').hide();
		cellSiteAnalysis++;
		
		return false;
	});
	
	
	
	var lonLatP4 = new OpenLayers.LonLat( -1, -1 );	
	var changeableMarkerP4 = new OpenLayers.Marker(lonLatP4);
	
	var bucm4 = [0];

	// function to show the flare
	function showFlare(lon, lat) {
		lonLatP4 = new OpenLayers.LonLat( lon, lat );

		map.addLayer(markers);
		icon = new OpenLayers.Icon('img/blue.png', size, offset);

		changeableMarkerP4 = new OpenLayers.Marker(lonLatP4,icon);
		markers.addMarker(changeableMarkerP4);
		if(flareCounter < 0) {
			flareCounter = 3; // stop displaying the flare marker after 3 sec
		}
	}

	$('#upleft').click(function() {

		if(sprintReady > 0) {
			latitude += 0.0001;
			longitude -= 0.0001;
			sprintReady--;
		} else {
			latitude += 0.000005;	
			longitude -= 0.000005;	
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
	
		// see https://stackoverflow.com/questions/32002366/javascript-disable-the-click-event-for-1-second-after-an-id-is-clicked
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#left').click(function() {
		
		if(sprintReady > 0) {
			longitude -= 0.0001;
			sprintReady--;
		} else {
			longitude -= 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#downleft').click(function() {
		
		if(sprintReady > 0) {
			latitude -= 0.0001;
			longitude -= 0.0001;
			sprintReady--;
		} else {
			latitude -= 0.000005;
			longitude -= 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#up').click(function() {
		
		if(sprintReady > 0) {
			latitude += 0.0001;
			sprintReady--;
		} else {
			latitude += 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay						
	});
	
	$('#down').click(function() {
		
		if(sprintReady > 0) {
			latitude -= 0.0001;
			sprintReady--;
		} else {
			latitude -= 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#upright').click(function() {
		
		if(sprintReady > 0) {
			latitude += 0.0001;
			longitude += 0.0001;
			sprintReady--;
		} else {
			latitude += 0.000005;
			longitude += 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#right').click(function() {
		
		if(sprintReady > 0) {
			longitude += 0.0001;
			sprintReady--;
		} else {
			longitude += 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1);
		// let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
			// enable click after 1 second
			$('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
	});
	
	$('#downright').click(function() {
		
		if(sprintReady > 0) {
			latitude -= 0.0001;
			longitude += 0.0001;
			sprintReady--;
		} else {
			latitude -= 0.000005;
			longitude += 0.000005;
		}
		
		redrawMap(longitude, latitude, playeridviagps, 1); // let a common class(disable-btn) for each button which should be disabled for on second
		$('.disable-btn').prop('disabled',true);
		setTimeout(function(){
		   // enable click after 1 second
		   $('.disable-btn').prop('disabled',false);
		},50); // 0.5 second delay
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

			userid = playerid;
							
			var dt = new Date();
			var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

			$.post(

				url,

				{ "time": time, "longitude": longitude, "latitude": latitude, "userid": userid, "flareLon": -1, "flareLat": -1, "disguise": disguise },

				function(data) {
	   
					/*latitudeP2 = data[0];
					longitudeP2 = data[1];*/
					if(gamemode == 1) {
						chechForStreet();
					}
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

				userid = playeridviagps;
								
				var dt2 = new Date();
				var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();

				$.post(

					url,

					{ "time": time2, "longitude": longitudeP2, "latitude": latitudeP2, "userid": userid, "flareLon": lonLatP4.lon, "flareLat": lonLatP4.lat },

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
	
	// set the avatar, if player has one
	if(loggedinAvatar != 0) {
		images = loggedinAvatar;
		avatarArray = images.split('/');
		avaIconUrl = 'img/avatars/avatarmarkers/'+avatarArray[3];
		var icon = new OpenLayers.Icon(avaIconUrl, size, offset);
	} else {
		var icon = new OpenLayers.Icon('img/marker.png', size, offset);
	}

//	var icon = new OpenLayers.Icon('img/marker.png', size, offset);
	var bucm3 = 0;
	var buFlareLatArr = -1;
	function redrawMapOthers() {
								
		// get playerids
		$.post(

			url,

			{ "getplayerids": gamematchid },

			function(data) {
				idArr = new Array();
				roleArr = new Array();
				flareLonArr = new Array();
				flareLatArr = new Array();
				for(j=0; j<data[2].length; j++) {

					latitudeP3[j] = parseFloat(data[0][j]);
					longitudeP3[j] = parseFloat(data[1][j]);
					idArr[j] = parseFloat(data[2][j]);
					roleArr[j] = parseFloat(data[3][j]);
					flareLonArr[j] = parseFloat(data[4][j]);
					flareLatArr[j] = parseFloat(data[5][j]);

					if(idArr[j] != playeridviagps) {

						if(flareLatArr[j]>0 && flareCounter < 0 && bucm4[0] != idArr[j]) {
							showFlare(flareLonArr[j], flareLatArr[j]);
							bucm4[0] = idArr[j];
							buFlareLatArr = flareLatArr[j];
						} else if(((flareLatArr[j]>0) || (buFlareLatArr > 0)) && flareCounter == 0) {
							markers.removeMarker(changeableMarkerP4);
							flareCounter--;
							lonLatP4 = new OpenLayers.LonLat( -1, -1 );
							flareLatArr[j] = -1;
							flareLonArr[j] = -1;
							bucm4[0] = 0;
						}
							
						if(startP2 != 0) {
							markers.removeMarker(changeableMarkerP3[j]);
						}
						lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
							.transform(
								new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
								map.getProjectionObject() // to Spherical Mercator Projection
							);
						
						if(roleArr[j] != 1) {						
							icon = new OpenLayers.Icon('img/yellow.png', size, offset);
						} else {
							icon = new OpenLayers.Icon('img/green.png', size, offset);
						}

						changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
						markers.addMarker(changeableMarkerP3[j]);
													
						if((playerrole != 1) && (roleArr[j] == 1)) {
							
							if(cellSiteAnalysis != 1) {
								markers.removeMarker(changeableMarkerP3[j]);
								showBandit();
							} else {
								cellSiteAnalysis++;
							}
						}
													
						// check whether the bandit was caught
						checkGameEnd();
					} else {

						if(flareLatArr[j]>0 && flareCounter < 0 && bucm4[0] != idArr[j]) {
							showFlare(flareLonArr[j], flareLatArr[j]);
							bucm4[0] = idArr[j];
						} else if(flareLatArr[j]>0 && flareCounter == 0) {
							markers.removeMarker(changeableMarkerP4);
							flareCounter--;
							lonLatP4 = new OpenLayers.LonLat( -1, -1 );
							flareLatArr[j] = -1;
							flareLonArr[j] = -1;
						}
						
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
														
							if(playerrole != 1) {
								getCurrentPosition = navigator.geolocation.getCurrentPosition(
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
											map.addLayer(markers);
											changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
											markers.removeMarker(changeableMarkerP3[j]);

											markers.addMarker(changeableMarkerP3[j]);

											userid = playeridviagps;
																		
											var dt2 = new Date();
											var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();

											$.post(

												url,

												{ "time": time2, "longitude": longitudeP3[j], "latitude": latitudeP3[j], "userid": userid, "flareLon": lonLatP4.lon, "flareLat": lonLatP4.lat },

												function(data) {
																					
												}, 

												"json"
											);
											map.setCenter(lonLatP3[j], zoom);
										}
										if(bucm3 != 0) {
											markers.removeMarker(bucm3);
										}
										// restore the backedup values
										latitudeP3[j] = latitudeP2;
										longitudeP3[j] = longitudeP2;
																	
										// check whether the bandit was caught
										checkGameEnd();
																	
									}, 
									function(){ // Positionsbestimmung gescheitert
									},{enableHighAccuracy: true}
								);
							}
							markers.removeMarker(changeableMarkerP3[j]);
						}
					}
												
				}
				startP2 = 1;
			}, 

			"json"
		);

	}
					
	var showBanditCheck = 0;
	countdownminutes = 60 * document.querySelector('#gametime').value;
					
	interval = setInterval(function() {
		if(winner == 0) {

			if(numberofplayers > 1) {
				redrawMapOthers();
			}
			
			sprintRecover--;
			
			if((sprintReady == 10) && (sprintRecover == 0)) {
				sprintReady = 0;
				$('#sprintButton').show();
			}
			
			if((playerrole == 1) && (disguise < 1) && ($("#controls").css("display") == "none")) {
				$('#controls').show();
			}
			
			disguiseRecover--;
			
			if((disguise > 0) && (playerrole == 1)) {
				disguise--;
				uopdateDisg = 1;
				$.post(

					url,

					{ "userid": playeridviagps, "disguise": disguise, "uopdateDisg": uopdateDisg },

					function(data) {

					}, 

					"json"
				);
				uopdateDisg = 0;
			}
			
			if(disguiseRecover == 0) {
				$('#disguiseButton').show();
			}
			
			if(flareCounter > 0) {
				flareCounter--;
			} else if(flareCounter == 0) {
				lonLatP4 = new OpenLayers.LonLat( -1, -1 );
				changeableMarkerP4 = new OpenLayers.Marker(lonLatP4);
			}
			
			if(flareCounter > 0) {
				flareCounter--;
			} else if(flareCounter == 0) {
				lonLatP4 = new OpenLayers.LonLat( -1, -1 );
				changeableMarkerP4 = new OpenLayers.Marker(lonLatP4);
			}
							
			countdownminutes--;
							
			if(checkallready == 0) {
				$.post(

					url,

					{ "checkallready": checkallready, "matchidready": gamematchid },

					function(data) {
						if(data > 0) {
							checkallready++;
							$("#time").html($("#gametime").val());
							countdownminutes = 60 * document.querySelector('#gametime').value;
							display = document.querySelector('#time');
							startTimer(countdownminutes, display);
						} else {
							$("#time").html("Warte auf andere Spieler");
						}
					}, 

					"json"
				);
			}
			
			// disable the bandits access to te chat after half time
			if(playerrole == 1 && (countdownminutes <= (30 * $('#gametime').val()))) {
				$('#chatBTNdiv').hide();
			}
		}
	}, 1000);
	
	if(playerrole == 1) {
		$('#flaregun').hide();
	}
	
	// have lower vision in the evening
	var getCurrentTime = new Date(Date.now());
	var formattedVision = getCurrentTime.getHours();
					
	function checkGameEnd() {
		$.ajaxSetup({async: false});
		if(winner == 0 && checkallready > 0) {
														
			checkForWin = 1;
						
			$.post(

				url,

				{ "checkForWin": checkForWin, "matchid": gamematchid, "formattedVision": formattedVision },

				function(data) {
									
					remainingTime = document.querySelector('#time').innerHTML;

					if((remainingTime == '00:00') || (countdownminutes == 0)) {
						
						winner = 1;
						if(playerrole == '1') {
							rating = 1;
						} else {
							rating = 0;
						}
										
						$.post(

							url,

							{ "playerId": playeridviagps, "matchid": gamematchid, "rating": rating, "playerrole": playerrole  },

							function(data) {
								alert('Der Bandit gewinnt!');
								history.go(-3);
							}, 

							"json"
						);
										
										
					} else if(data == 'y') {
						
						winner = 1;
						if(playerrole != '1') {
							rating = 1;
						} else {
							rating = 0;
						}
										
						$.post(

							url,

							{ "playerId": playeridviagps, "matchid": gamematchid, "rating": rating, "playerrole": playerrole },

							function(data) {
								alert('Die Detektive siegen!');
								history.go(-3);
							}, 

							"json"
						);

					} else if(data == 's' && ((armodeActive % 2) != 0)) {
						
						$("#showman").show();
						$('#gameHints').html('Du h&ouml;rst ein Rascheln ganz in der N&auml;he');
					//	stopGivingGreatHints();
						
					} else if(data == 'a' ) {
						
						soundActive = 1;
						playAudio();
						$("#showman").hide();
						$('#gameHints').html('Du h&ouml;rst Schritte');
						//stopGivingGreatHints();
						
					} else if(data == 'north' ) {
						
						$('#gameHints').html('Aus n&ouml;rdlicher Richtung vernimmst Du ein Hundebellen');
						stopGivingGreatHints();
						
					} else if(data == 'south' ) {
						
						$('#gameHints').html('Aus s&uuml;dlicher Richtung vernimmst Du ein Hundebellen');
						stopGivingGreatHints();
						
					} else if(data == 'east' ) {
						
						$('#gameHints').html('Aus &ouml;stlicher Richtung vernimmst Du ein Hundebellen');
						stopGivingGreatHints();
						
					} else if(data == 'west' ) {
						
						$('#gameHints').html('Aus westlicher Richtung vernimmst Du ein Hundebellen');
						stopGivingGreatHints();
						
					} else if(data == 'noinfo' ) {
						
						$('#gameHints').html('Das Hundebellen ist verstummt');
						stopGivingGreatHints();
						
					}

					// hide the cellsite analysis, if the bandit is disguised
					if((data == 'noinfo') && (playerrole != 1)) {
						$('#cellsite').hide();			
					} else if((data != 'noinfo') && (playerrole != 1) && (cellSiteAnalysis < 1)) {
						$('#cellsite').show();
					}

				}, 
				"json"
			);
					
			return winner;
		}
		$.ajaxSetup({async: true});
	}
	
	// makes the footsteps invisible and deactivates the stepsound
	function stopGivingGreatHints() {
		$("#showman").hide();
		soundActive = 0;
		playAudio();
	}
					
	var extrashowup = 0;
	function showBandit() {
		if(showBanditCheck == 0) {
			showBandit1 = Math.round(countdownminutes - 30); // after 30 sec
			showBandit2 = Math.round(countdownminutes / 2); // after half the playtime
			showBandit3 = Math.round(countdownminutes / 4); // after 3 quarters of playtime
							
			// make up to two random extra showups
			extrashowup = Math.floor(Math.random() * 3);
			if(extrashowup >= 1) {
				showBandit4 = Math.round(countdownminutes / 8); // after 7 eights of playtime
			}
			if(extrashowup == 2) {
				showBandit5 = Math.round(countdownminutes / 16); // after 15 six-teens of playtime
			}
			
			// make an extra showup for low-skilled players
			if(winLossRatioLS < 0.5) {
				showBandit6 = Math.round(countdownminutes / 24); // after 23 twenty-forths of playtime
			}
			
			// and another one for super low-skilled players
			if(winLossRatioLS < 0.25) {
				showBandit7 = Math.round(countdownminutes / 32); // after 31 thirty-twos of playtime
			}
			
			showBanditCheck++;
		}

		if(countdownminutes == showBandit1) {
			markers.addMarker(changeableMarkerP3[j]);
			
			// hide the visual hints
			if((showBanditCheck % 2) != 0) {
				$('#gameHints').hide();
			}
		}
						
		if(countdownminutes == showBandit2) {
			markers.addMarker(changeableMarkerP3[j]);
			
			// reshow the hints
			if((showBanditCheck % 2) != 0) {
				$('#gameHints').show();
			}
		}
						
		if(countdownminutes == showBandit3) {
			markers.addMarker(changeableMarkerP3[j]);
		}
						
		if(extrashowup >= 1) {
			if(countdownminutes == showBandit4) {
				markers.addMarker(changeableMarkerP3[j]);
			}
		}
						
		if(extrashowup == 2) {
			if(countdownminutes == showBandit5) {
				markers.addMarker(changeableMarkerP3[j]);
			}
		}
		
		if(winLossRatioLS < 0.5) {
			if(countdownminutes == showBandit6) {
				markers.addMarker(changeableMarkerP3[j]);
			}
			
			if(winLossRatioLS < 0.25) {
				if(countdownminutes == showBandit7) {
					markers.addMarker(changeableMarkerP3[j]);
				}
			}
		}

	}
	
});