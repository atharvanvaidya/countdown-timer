
var start = document.getElementById('startButton');
var reset = document.getElementById('resetButton')
var min = document.getElementById('min');
var sec = document.getElementById('sec');
min.value = "00";
sec.value = "00";
var killFlag = 0;
var pauseFlag = 0;
var completeFlag = 1;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

start.addEventListener("click",startPauseTimer);
reset.addEventListener("click",resetTimer);

async function countdown() {
  var minutes = parseInt(min.value, 10);
  var seconds = parseInt(sec.value, 10);
  console.log(minutes + " " + seconds);
  loop1:
  while(minutes >= 0){
    if(minutes < 10){
      min.value = "0"+minutes;
    }
    while (seconds >= 0){
      if(killFlag == 1){
        min.value = "00";
        sec.value = "00";
        completeFlag = 0;
        break;
      }
      else if (pauseFlag == 1) {
        completeFlag = 0;
        break loop1;
      }
      if(seconds < 10){
        sec.value = "0"+seconds;
      }
      else{
        sec.value = seconds;
      }
      await sleep(1000);
      seconds -= 1;
    }
    if(minutes == 0){
      //completeFlag = 0;
      break;
    }
    else{
      minutes -= 1;
      if(minutes < 10){
        min.value = "0"+minutes;
      }
      else{
        min.value = minutes;
      }
      seconds = 59;
    }
  }
  if(completeFlag == 1){
    start.innerHTML = "Start!";
  }
}

function startPauseTimer(){
  if(isNaN(parseInt(min.value)) || isNaN(parseInt(sec.value))){
    alert("Enter the Input Correctly!");
  }
  else if (sec.value >= 60) {
    alert("Enter the Seconds between 0 to 59!");
  }
  else{
    if(start.innerHTML === "Start!"){
      console.log("Timer Started!");
      start.innerHTML = "Pause!";
      killFlag = 0;
      pauseFlag = 0;
      completeFlag = 1;
    }
    else{
      console.log("Timer Paused!");
      start.innerHTML = "Start!";
      killFlag = 0;
      pauseFlag = 1;
      completeFlag = 1;
    }
    countdown();
  }
}

function resetTimer() {
  killFlag = 1;
  min.value = "00";
  sec.value = "00";
  console.log("Timer Reset!");
  start.innerHTML = "Start!";
  pauseFlag = 0;
}
