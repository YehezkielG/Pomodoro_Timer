let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let timerField = document.getElementById("Timer");
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isPaused = false;

resetBtn.addEventListener("click", () => {
  startTimer(duration);
});

let startTimer;
let duration = 60 * 25;
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
        document.title = `${durationTxt} - ${tasks[tasks.length - 1].taskName}`;
        } else {
        document.title = `${durationTxt}`;
        }
    }, 1000);
});

function stopTimer(){
    clearInterval(startTimer);
}
