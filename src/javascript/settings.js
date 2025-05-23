let settingBtn = document.getElementById("settingBtn");
let setBtn = document.getElementById("set");
let inputTimer = document.getElementById("setTimer");
let inputBreakTimer = document.getElementById("setBreakTimer");

settingBtn.addEventListener("click",()=>{
    document.getElementById("settings").classList.remove("hidden")
})

let startTimer;
var setTimer = 25;
let Time = setTimer * 60;
let duration = Time;

setBtn.addEventListener("click",()=>{
    if(inputTimer.value != ""){
        if(isPomodoroSelected){
            setTimer = parseInt(inputTimer.value);
        }
        else{
            setTimer = parseInt(inputBreakTimer.value);
        }
        document.getElementById("settings").classList.add("hidden");
        stopTimer();
        Reset();
    }
})
