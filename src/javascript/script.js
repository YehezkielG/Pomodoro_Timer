let timerOption = document.querySelectorAll('input[name="selectTimer"]');
let isPomodoroSelected = true;

var History = JSON.parse(localStorage.getItem("histories")) || [];

let previousSession = History[0]?.sessionPomodoro ?? 0;

console.log(previousSession);
document.querySelectorAll("#sessionCount").forEach((element) => {
  element.innerHTML = previousSession;
});
let getHistory = [];

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

document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("historyInterface").classList.add("hidden");
});

document.getElementById("historyBtn").addEventListener("click", () => {
  document.getElementById("historyInterface").classList.remove("hidden");
  getHistory = History;
  updateTable(History);
});

function updateTable(history) {
  document.getElementById("activityField").innerHTML = "";
  let table = document.getElementById("activityField");
  let rows = '';
  history.slice(1).forEach((item) => {
    rows += `
      <tr class = 'my-5 bg-gray-100'>
      <td class='p-2 font-bold'>${item.activity}</td>
      <td>${item.date}</td>
      <td>${item.time}</td>
      </tr>
    `;
  });
  table.innerHTML = rows;
}

window.onload = function () {};
