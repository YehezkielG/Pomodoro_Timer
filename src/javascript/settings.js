let settingBtn = document.getElementById("settingBtn");
let setBtn = document.getElementById("set");
let inputTimer = document.getElementById("setTimer");

settingBtn.addEventListener("click",()=>{
    document.getElementById("settings").classList.remove("hidden")
})

let startTimer;
var setTimer = 25;
let Time = setTimer * 60;
let duration = Time;

setBtn.addEventListener("click",()=>{
    setTimer = parseInt(inputTimer.value);
    console.log(setTimer);
    document.getElementById("settings").classList.add("hidden");
    stopTimer();
    Reset();
})
