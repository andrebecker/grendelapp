$(function() {

	var getGamePlayerName = 0;
	getGamePlayerName = $("#getGamePlayerName").val();
	
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("chatBTN");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	var chatIsActive = 0;

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
		
		if(chatIsActive == 0) {
			modal.style.display = "block";
			updateChat();
			chatIsActive = 1;
			$('#chatBTN').css("background", "#a300ec");
			$('#chatBTN').css("background", "linear-gradient(to bottom, #a300ec 5%, #7e20a8e6 100%)");
		} else {
			modal.style.display = "none";
			chatIsActive = 0;
		}
	}
	
	interval = setInterval(function() {

		updateChat();		

	}, 1000);

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		chatIsActive = 0;
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
	
	// ask user for name with popup prompt    
        var name = getGamePlayerName;
        
        // default name is 'Detective'
    	if (!name || name === ' ') {
    	   name = "Detective";	
    	}
    	
    	// strip tags
    	name = name.replace(/(<([^>]+)>)/ig,"");
    	
    	// display name on page
    	$("#name-area").html("Ihr Name: <span>" + name + "</span>");
    	
    	// kick off chat
        var chat =  new Chat();
    	$(function() {
    	
    		 chat.getState(); 
    		 
    	 // watch textarea for key presses
            $("#sendie").keydown(function(event) {  
             
                var key = event.which;  
           
                //all keys including return.  
                if (key >= 33) {
                   
                    var maxLength = $(this).attr("maxlength");  
                    var length = this.value.length;  
                     
                    // don't allow new content if length is maxed out
                    if (length >= maxLength) {  
                        event.preventDefault();  
                    }  
                }
    		});
    		 // watch textarea for release of key press
    		 $('#sendie').keyup(function(e) {	
    		 					 
    			  if (e.keyCode == 13) { 
    			  
                    var text = $(this).val();
    				var maxLength = $(this).attr("maxlength");  
                    var length = text.length; 
                     
                    // send 
                    if (length <= maxLength + 1) { 
                     
    			        chat.send(text, name);	
    			        $(this).val("");
    			        
                    } else {
                    
    					$(this).val(text.substring(0, maxLength));
    					
    				}	
    				
    				
    			  }
             });
            
    	});
	
	
	
	
	
	/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var file;

function Chat () {
    this.update = updateChat;
    this.send = sendChat;
	this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		 instanse = true;
		 $.ajax({
			   type: "POST",
			   url: "https://platinpanda.com/bsc/process.php",
			   data: {  
			   			'function': 'getState',
						'file': file
						},
			   dataType: "json",
			
			   success: function(data){
				   state = data.state;
				   instanse = false;
			   },
			});
	}	 
}

//Updates the chat
function updateChat(){
	 if(!instanse){
		 instanse = true;
	     $.ajax({
			   type: "POST",
			   url: "https://platinpanda.com/bsc/process.php",
			   data: {  
			   			'function': 'update',
						'state': state,
						'file': file
						},
			   dataType: "json",
			   success: function(data){
				   if(data.text){
						for (var i = 0; i < data.text.length; i++) {
                            $('#chat-area').append($("<p>"+ data.text[i] +"</p>"));
                        }

						if(chatIsActive == 0) {
							$('#chatBTN').css("background", "#ffc800");
							$('#chatBTN').css("background", "linear-gradient(to bottom, #FACA30 5%, #F6CF50 100%);");
						}

				   }
				   document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
				   instanse = false;
				   state = data.state;
			   },
			});
	 }
	 else {
		 setTimeout(updateChat, 1500);
	 }
}

//send the message
function sendChat(message, nickname)
{       
    updateChat();
     $.ajax({
		   type: "POST",
		   url: "https://platinpanda.com/bsc/process.php",
		   data: {  
		   			'function': 'send',
					'message': message,
					'nickname': nickname,
					'file': file
				 },
		   dataType: "json",
		   success: function(data){
			   updateChat();
		   },
		});
}
});