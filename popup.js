
let background = chrome.extension.getBackgroundPage (); 

//Set time
function setTime(e){
	let mins = document.getElementById("input").value;
	if(isNaN(mins) || mins < 1 || mins > 60){
		document.getElementById("warning").innerHTML="Please enter a number";
		setTimeout(function(){
			document.getElementById("warning").innerHTML="";
		}, 3000);
		
	}
	else{
		background.start(mins);
	}
}


//Reset 
function stop(e){
	background.stop();
	document.getElementById("input").value = "";
}


//Listeners
window.onload = function(){
	document.getElementById("stopBtn").addEventListener("click", stop);
    document.getElementById("setTimeBtn").addEventListener("click", setTime);

	chrome.storage.sync.get("time",function(obj){ 
		var time = obj.time;
		if(time != undefined && time != -1){
			document.getElementById("input").value = time;
		}
	});
}