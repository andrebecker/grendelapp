$(function() {
	
	//	var armodeActive = 0;

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {

	// Now safe to use device APIs
		var permissions = cordova.plugins.permissions;

		permissions.hasPermission(permissions.CAMERA, function(status) {
		  if (status.hasPermission) {
			// here you can savely start your own plugin because you already have CAMERA permission
			streamCamAndAudio = 1;
		  }
		  else {
			// need to request camera permission
			permissions.requestPermission(permissions.CAMERA, success, error);

			function error() {
			  // camera permission not turned on
			}

			function success(status) {
			  if (status.hasPermission) {
				// user accepted, here you can start your own plugin
				streamCamAndAudio = 1;
			  }
			}
		  }
		});

		var streamCamAndAudio = 0;

		$("#arButton").click(function() {
			armodeActive++;
			if((armodeActive % 2) != 0) {

				if($("#gameplayerrole").val() != 1) {
					$("#mapdiv").css("height", "22vw");
				}

				$("#armodeSelect").show();
				$("#videostream").show();

				var videoElement = document.querySelector('video');
				//var audioSelect = document.querySelector('select#audioSource');
				var videoSelect = document.querySelector('select#videoSource');

				navigator.mediaDevices.enumerateDevices()
				  .then(gotDevices).then(getStream).catch(handleError);

				//audioSelect.onchange = getStream;
				videoSelect.onchange = getStream;

				function gotDevices(deviceInfos) {
				  for (var i = 0; i !== deviceInfos.length; ++i) {
					var deviceInfo = deviceInfos[i];
					var option = document.createElement('option');
					option.value = deviceInfo.deviceId;
					/*if (deviceInfo.kind === 'audioinput') {
					  option.text = deviceInfo.label ||
						'microphone ' + (audioSelect.length + 1);
					  audioSelect.appendChild(option);
					} else */if (deviceInfo.kind === 'videoinput') {
					  option.text = deviceInfo.label || 'camera ' +
						(videoSelect.length + 1);
					  videoSelect.appendChild(option);
					} else {
					  console.log('Found one other kind of source/device: ', deviceInfo);
					}
				  }
				}

				function getStream() {
				  if (window.stream) {
					window.stream.getTracks().forEach(function(track) {
					  track.stop();
					});
				  }

				  var constraints = {
					/*audio: {
					  deviceId: {exact: audioSelect.value}
					},*/
					video: {
					  deviceId: {exact: videoSelect.value}
					}
				  };

				  navigator.mediaDevices.getUserMedia(constraints).
					then(gotStream).catch(handleError);
				}

				function gotStream(stream) {
				  window.stream = stream; // make stream available to console
				  videoElement.srcObject = stream;
				}

				function handleError(error) {
				  console.log('Error: ', error);
				}
			} else {

				if($("#gameplayerrole").val() != 1) {
					$("#mapdiv").css("height", "40vw");
				}

				$("#showman").hide();
				$("#armodeSelect").hide();
				$("#videostream").hide();
				$('#videostream').attr('src', '');
				$("#videostream")[0].load();
				window.stream.stop();
			}
		});
	}
});