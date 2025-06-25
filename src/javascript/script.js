let timerOption = document.querySelectorAll('input[name="selectTimer"]');
let isPomodoroSelected = true;

function setHistory() {
  getHistory = JSON.parse(localStorage.getItem("histories")) || [];
  previousSession = getHistory[0]?.sessionPomodoro ?? 0;
}

var getHistory = JSON.parse(localStorage.getItem("histories")) || [];
let previousSession = getHistory[0]?.sessionPomodoro ?? 0;

document.querySelectorAll("#sessionCount").forEach((element) => {
  element.innerHTML = previousSession;
});

function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

timerOption.forEach((radio) => {
  radio.addEventListener("change", function () {
    timerOption.forEach((radio) => {
      radio.parentElement.classList.toggle("bg-gray-800");
    });
    isPomodoroSelected = !isPomodoroSelected;
    if (isPomodoroSelected) {
      setTimer = parseFloat(inputTimer.value);
    } else {
      setTimer = parseFloat(inputBreakTimer.value);
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
  setHistory();
  updateTable(getHistory);
});

function updateTable(history) {
  document.getElementById("activityField").innerHTML = "";
  let table = document.getElementById("activityField");
  let rows = "";
  if (history.length > 1) {
    history.slice(1).forEach((item) => {
      rows += `
        <tr class = 'my-5 bg-gray-100'>
        <td class='p-2 font-bold'>${item.activity}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        </tr>
      `;
    });
  }
  table.innerHTML = rows;
}

document
  .getElementById("notificationOption")
  .addEventListener("change", function () {
    document.getElementById("Audio").src = `Notification/${this.value}.mp3`;
    document.getElementById("Audio").play();
  });

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("histories");
  document.querySelectorAll("#sessionCount").forEach((element) => {
    element.innerHTML = 0;
  });
  document.getElementById("activityField").innerHTML = "";
});
