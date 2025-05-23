timerField = document.getElementById("BreakTimer");
tasks = JSON.parse(localStorage.getItem("tasks")) || [];
isPaused = false;

function Reset(){
    startBtn.textContent = "Start";
    Time = breakTimer * 60;
    duration = Time;
    let durationTxt = `${Math.floor(duration / 60)
        .toString()
        .padStart(2, "0")}:${(duration % 60).toString().padStart(2, "0")}`;
        timerField.innerHTML = durationTxt;
    isPaused = false;
    document.getElementById("progressBar").style = `width:0%`;
}

resetBtn.addEventListener("click", () => {    
    stopTimer();
    Reset();
});
startBtn.addEventListener("click", function () {
    this.textContent = !isPaused ? "Pause" : "continue";
    isPaused = !isPaused;
    if(!isPaused){
        stopTimer()
        return
    }
    startTimer = setInterval(() => {
        duration--;
        let durationTxt = `${Math.floor(duration / 60)
        .toString()
        .padStart(2, "0")}:${(duration % 60).toString().padStart(2, "0")}`;
        timerField.innerHTML = durationTxt;
        if (tasks.length > 0) {
        document.title = `${durationTxt} - ${tasks[0].taskName}`;
        } else {
        document.title = `${durationTxt}`;
        }        
        let percent = ((Time - duration)/Time) * 100;
        document.getElementById("progressBar").style = `width:${percent}%`;
        console.log(duration)
        if(duration <= 0){
            clearInterval(startTimer);
        }
    }, 1000);
});

function stopTimer(){
    clearInterval(startTimer);
}
