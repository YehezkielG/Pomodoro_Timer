let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let timerField = document.getElementById("Timer");
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isPaused = false;

function Reset() {
  if (isPomodoroSelected) {
    setTimer = parseFloat(inputTimer.value);
  } else {
    setTimer = parseFloat(inputBreakTimer.value);
  }
  startBtn.textContent = "Start";
  Time = setTimer * 60;
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
  resetActivity();
});

function dateString() {
  const d = new Date();
  let day = d.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let setday = days[day];
  var mounths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var getIndexMounth = d.getMonth();
  var mounth = mounths[getIndexMounth].slice(0, 3);
  var dates = d.getDate().toString();
  if (dates.length == 0) {
    dates = ("0" + d.getDate()).toString;
  }
  var year = d.getFullYear();
  return setday + ", " + mounth + " " + dates + " " + year;
}

startBtn.addEventListener("click", function () {
  this.textContent = !isPaused ? "Pause" : "continue";
  isPaused = !isPaused;
  if (!isPaused) {
    stopTimer();
    return;
  }
  Start();
});

function taskTitle(){
  for(task of tasks){
    if(!task.completed){
      return task.taskName 
    }
  }
  return ""
}

function notification(){
  if(isPomodoroSelected){
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setTimeout(() => {
            showNotification("Focus Section Finished!", "Time to break");
          });
        }
      });
    }
  }else{
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setTimeout(() => {
            showNotification("Break Section Finished!", "Time to focus ♟️");
          });
        }
      });
    }
  }
}

function Start() {
  startTimer = setInterval(() => {
    duration--;
    let durationTxt = `${Math.floor(duration / 60)
      .toString()
      .padStart(2, "0")}:${(duration % 60).toString().padStart(2, "0")}`;
    timerField.innerHTML = durationTxt;  
    document.title = `${durationTxt} - ${taskTitle()}`;
    let percent = ((Time - duration) / Time) * 100;
    document.getElementById("progressBar").style = `width:${percent}%`;
    if (duration <= 0) {
      document.getElementById("Audio").play();
      setHistory();
      getHistory[0] = { sessionPomodoro: previousSession + 1 };
      getHistory.push({
        activity: isPomodoroSelected ? "Focus" : "Break",
        date: dateString(),
        time: `${Math.floor(Time / 60)
          .toString()
          .padStart(2, "0")}:${(Time % 60).toString().padStart(2, "0")}`,
      });
      localStorage.setItem("histories", JSON.stringify(getHistory));
      document.querySelectorAll("#sessionCount").forEach((element) => {
        element.innerHTML = getHistory[0].sessionPomodoro;
      });
      previousSession = getHistory[0].sessionPomodoro || 0;
      notification();
      clearInterval(startTimer);
      switchActivity();
      resetActivity();      
    }
  }, 1000);
}

function switchActivity(){
  isPomodoroSelected = !isPomodoroSelected;
  timerOption.forEach((radio) => {
    radio.parentElement.classList.toggle("bg-gray-800");
    document.getElementById("pomodoroBtn").checked =  isPomodoroSelected;
    document.getElementById("breakBtn").checked =  !isPomodoroSelected;
  });
  if (isPomodoroSelected) {
    setTimer = parseFloat(inputTimer.value);
  } else {
    setTimer = parseFloat(inputBreakTimer.value);
  }
}

function resetActivity() {
  stopTimer();
  Reset();
}

function stopTimer() {
  clearInterval(startTimer);
}
