const currentDate = new Date();
//var isActive = false;
var status = "reset";
var state = "timer";

function fadeIn() {
  document.getElementById("container").style.opacity = "1";
}

var sessionLength = parseInt(document.getElementById("sessionLengthChoice").innerHTML);
var breakLength = parseInt(document.getElementById("breakLengthChoice").innerHTML);

var sec = parseInt(document.getElementById("displayLengthSeconds").innerHTML);
var min = parseInt(document.getElementById("displayLengthMins").innerHTML);

var interval = null;

function startStopTimer() { 
  if (interval === null && status == "reset") {
    status = "active"; 
    interval = setInterval(myTimer, 1000); 
    document.getElementById("start-btn").classList.add('start-btn-active');
    document.getElementById("start-btn").innerHTML = "Pause";
    //change background color
    //background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);
    //document.body.style.background = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)";
    document.getElementById("wrapper").style.opacity = "1";
    
    
  } else if (interval !== null && status == "active") {
    status = "paused";
    clearInterval(interval);
    interval = null;
    document.getElementById("start-btn").classList.remove('start-btn-active');
    document.getElementById("start-btn").innerHTML = "Resume";
    //document.body.style.background = 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)';
    document.getElementById("wrapper").style.opacity = "0";
  } else if (interval === null && status == "paused") {
    status = "active"; 
    interval = setInterval(myTimer, 1000); 
    document.getElementById("start-btn").classList.add('start-btn-active');
    document.getElementById("start-btn").innerHTML = "Pause";
    //document.body.style.background = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)";
    document.getElementById("wrapper").style.opacity = "1";
  } 
}

function changeState() {
  if (state == "timer") {
    state = "break";
    min = document.getElementById("breakLengthChoice").innerHTML;
  } else {
    state = "timer";
    min = document.getElementById("sessionLengthChoice").innerHTML;
  }
}

function resetTimer() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
  document.getElementById("displayLengthSeconds").innerHTML = "00";
  document.getElementById("displayLengthMins").innerHTML = document.getElementById("sessionLengthChoice").innerHTML;
  document.getElementById("start-btn").classList.remove('start-btn-active');
  document.getElementById("start-btn").innerHTML = "Start";
  status = "reset";
  //document.body.style.background = 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)';
  document.getElementById("wrapper").style.opacity = "0";
}
    
function myTimer() {
  sec = parseInt(document.getElementById("displayLengthSeconds").innerHTML);
  min = parseInt(document.getElementById("displayLengthMins").innerHTML);

  // counts the seconds from 60 to 0
  if (sec > 0) {
    sec--
  } else if (min == 0 && sec == 0) {
    changeState();
  } else if (sec == 0) {
    sec = 59;
    min--;
  } 
  
  // prints it with a 0 in front
  if (sec >= 0 && sec < 10) {
    sec = "0" + sec;
  }
  
  if (min >=0 && min <10) {
    min = "0" + min;
  }
  
  // changes the HTML of the timer
  document.getElementById("displayLengthSeconds").innerHTML = sec;
  document.getElementById("displayLengthMins").innerHTML = min;
}

function adjustSesh(e) {
  if (status == "reset") {
    if (e == 'plus' && sessionLength <= 40) {
      sessionLength++;
      document.getElementById("sessionLengthChoice").innerHTML = sessionLength;
      document.getElementById("displayLengthMins").innerHTML = sessionLength;
      document.getElementById("displayLengthSeconds").innerHTML = "00";
    } else if (sessionLength > 1) {
      sessionLength--;
      document.getElementById("sessionLengthChoice").innerHTML = sessionLength;
      document.getElementById("displayLengthMins").innerHTML = sessionLength;
      document.getElementById("displayLengthSeconds").innerHTML = "00";
    }
  }
}

function adjustBreak(e) {
  if (status == "reset") {
      if (e == 'plus') {
      breakLength++;
      document.getElementById("breakLengthChoice").innerHTML = breakLength;
      //document.getElementById("sessionLength").innerHTML = sessionLength + ":00";
    } else if (breakLength > 1) {
      breakLength--;
      document.getElementById("breakLengthChoice").innerHTML = breakLength;
      //document.getElementById("sessionLength").innerHTML = sessionLength + ":00";
    }
  }
}