//Global
let SLEEP_TIME = -1;
let TIMER;
let NOTE_ID;

let options = {
  type: "basic",
  title: "Take A Break",
  message: "Maximize productivity and take a break!",
  iconUrl: "icon.png",
  requireInteraction: false
}

//When broser instance is first started
function onStartGo(){
	chrome.storage.sync.get(["time"], function(obj){
		let time = obj.time;
		if(time != undefined && time != -1) {
			SLEEP_TIME = time * 60000;
			remind();
		}
	});
}


//Initial method thats called to start the reminder process
function start(time){
	SLEEP_TIME = time * 60000;
	saveTime(time);
	remind();
}

//Continuously called until it is stopped 
function remind() {
    if(TIMER) clearTimeout(TIMER);
    TIMER = setTimeout(remind, SLEEP_TIME);
    options.requireInteraction = true;
    if (NOTE_ID) chrome.notifications.clear(NOTE_ID);
    chrome.notifications.create(options, function(id) {
        NOTE_ID = id;
    });
}

//Stops the current timer and notification if they exist
function stop(){
	if(TIMER){
		clearTimeout(TIMER);
		saveTime(-1);
	};
    
    if (NOTE_ID) chrome.notifications.clear(NOTE_ID);
}

//Save the time
function saveTime(time){
	     chrome.storage.sync.set({"time": time});
}


//Start
onStartGo();

chrome.runtime.onInstalled.addListener(function() {
    console.log("Made with <3 by Shanthosh")
  });