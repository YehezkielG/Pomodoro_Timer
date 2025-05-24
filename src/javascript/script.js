let timerOption = document.querySelectorAll('input[name="selectTimer"]');
let isPomodoroSelected = true;

var History = JSON.parse(localStorage.getItem("histories")) || [];
let previousSession = History.sessionPomodoro || 0;            
document.querySelectorAll("#sessionCount").forEach((element)=>{
  element.innerHTML = previousSession;
})

timerOption.forEach((radio) => {
  radio.addEventListener("change", function () {
    timerOption.forEach((r) => r.parentElement.classList.remove("bg-gray-800"));
    if (this.checked) {
      radio.parentElement.classList.add("bg-gray-800");
    }
    isPomodoroSelected = !isPomodoroSelected;
    if (isPomodoroSelected) {
      setTimer = parseInt(inputTimer.value);
    } else {
      setTimer = parseInt(inputBreakTimer.value);
    }
    stopTimer();
    Reset();
  });
});

document.getElementById("closeBtn").addEventListener("click",()=>{
  document.getElementById("historyInterface").classList.add("hidden");
})

document.getElementById("historyBtn").addEventListener("click",()=>{
  document.getElementById("historyInterface").classList.remove("hidden");
})