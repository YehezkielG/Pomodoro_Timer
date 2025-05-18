let startBtn = document.getElementById("start");
let timerField = document.getElementById("Timer");
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks[tasks.length])
function startTimer(duration){
    setInterval(()=>{
        duration--;
        let durationTxt = `${Math.floor(duration / 60).toString().padStart(2, "0")}:${(duration % 60).toString().padStart(2, "0")}`;
        timerField.innerHTML = durationTxt;
        document.title = `${durationTxt}`
    },1000)
}

let duration = 60*25;
startBtn.addEventListener("click",()=>{
    startTimer(duration)
})