let timerOption = document.querySelectorAll('input[name="selectTimer"]');
let isPomodoroSelected = true;

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
