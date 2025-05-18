
window.onload = function () {
    ShowData();
  };
  

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// i == index

let getTasks = [];

function ShowData(filter) {
  let totalcompleted = 0;
  removeChild();
  getTasks = tasks;
  getTasks.forEach((value, index) => {
    let logo = "radio_button_unchecked";
    if (value.completed) {
      logo = "check_circle";
      totalcompleted++;
    }
    let list = document.createElement("div");
    list.className = "clear-both";
    list.innerHTML = `
        <div class="flex bg-gray-600 bg-transparent my-1 z-10 shadow-sm">
        <div class="flex items-center px-2">
        <button class="flex bg-none hover:text-green-500 ${
          value.completed ? "text-green-500" : "text-cyan-500"
        }"  onclick="completed(${index})">
            <span class="material-symbols-outlined text-2xl">
             ${logo}
            </span>
        </button>
        </div>
            <div class="w-full py-2">
                <input type="text" id="task${index}" class="font-medium outline-none w-full text-lg bg-transparent ${
      value.completed ? "line-through" : ""
    } " readonly value = "${
      value.taskName
    }" placeholder="Can't edit task to empty">
            </div>
            <div class="flex items-center">
            <button class="flex items-center h-full px-2 text-white hidden bg-blue-500" id="checklogo${index}" onclick="update(${index})">
            <span class="material-symbols-outlined text-lg">
            check
            </span>
            </button>
            <button class="px-2 flex items-center" onclick="${
              value.completed ? `removeTask(${index})` : `showMenu(${index})`
            }" id="sidebtn${index}"">
           <span class="material-symbols-outlined text-lg" id="menuToggle${index}">
               ${value.completed ? "close" : "expand_more"}
           </span>
           </button>  
        </div>
        </div>
        <div class="hidden text-white w-full transition" id='menu${index}'>
        <div class="grid grid-cols-2">
        <button class="bg-red-400 p-2 flex content-center justify-center max-sm:block" onclick="removeTask(${index})" >
        <span class="material-symbols-outlined mr-1 max-sm:m-0 block">
                delete
        </span>             
        </button>
        <button class="bg-blue-400 p-2 flex items-center justify-center max-sm:block" onclick="updateInput(${index})">
        <span class="material-symbols-outlined mr-1 max-sm:m-0 block">
        edit
        </span>
        </button>
        </div>
        </div>

                 ${
                   !value.completed
                     ? `<small class='w-full' id='ShowDateTime${index}'>${value.DateTime.split(
                         "T"
                       ).join(" ")}</small>`
                     : ``
                 }
`;
    document.getElementById("tasksList").appendChild(list);
  });
}

function addData() {
  let input = document.getElementById("inputTask").value;
  if (input == "") {
    document.getElementById("invalid").classList.remove("hidden");
  } else {
    getTasks = tasks;
    getTasks.push({
      taskName: input.trim(),
      completed: false,
      DateTime: "",
    });
    localStorage.setItem("tasks", JSON.stringify(getTasks));
    document.getElementById("inputTask").value = "";
    document.getElementById("invalid").classList.add("hidden");
    ShowData();
  }
}

function removeChild() {
  var parentElement = document.getElementById("tasksList");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

// i == index

function removeTask(i) {
  closeMenu();
  getTasks = tasks;
  getTasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(getTasks));
  ShowData();
}

function completed(i) {
  getTasks = tasks;
  getTasks[i].completed = true;
  localStorage.setItem("tasks", JSON.stringify(getTasks));
  ShowData();
}

function showMenu(i) {
  let menu = document.getElementById("menu" + i);
  if (menu.classList.contains("hidden")) {
    closeMenu();
    menu.classList.remove("hidden");
    document.getElementById("menuToggle" + i).textContent = "expand_less";
  } else {
    menu.classList.add("hidden");
    document.getElementById("menuToggle" + i).textContent = "expand_more";
  }
}

function updateInput(i) {
  closeMenu();
  let taskInputBox = document.getElementById("task" + i);
  taskInputBox.removeAttribute("readonly");
  taskInputBox.focus();
  document.getElementById("checklogo" + i).classList.remove("hidden");
  document.getElementById("sidebtn" + i).classList.add("hidden");
}

function closeMenu() {
  for (let i = 0; i < tasks.length; i++) {
    document.getElementById("menu" + i).classList.add("hidden");
    if (
      document.getElementById("menuToggle" + i).textContent == "expand_less"
    ) {
      document.getElementById("menuToggle" + i).textContent = "expand_more";
    }
    document.getElementById("sidebtn" + i).classList.remove("hidden");
    document.getElementById("checklogo" + i).classList.add("hidden");
    document.getElementById("task" + i).readOnly = true;
  }
}

function update(i) {
  let edit = document.getElementById("task" + i).value;
  if (edit != "") {
    getTasks = tasks;
    getTasks[i].taskName = edit;
    localStorage.setItem("tasks", JSON.stringify(getTasks));
    document.getElementById("checklogo" + i).classList.add("hidden");
    document.getElementById("sidebtn" + i).classList.remove("hidden");
  } else {
    ShowData();
  }
  closeMenu();
}
let taskCategory = document.querySelectorAll("#TaskCategory");

taskCategory.forEach((ul, index) => {
  ul.addEventListener("click", () => {
    taskCategory.forEach((ul) => {
      ul.classList.remove("bg-gray-100");
      ul.classList.remove("text-blue-700");
    });
    if (index == 1) {
      ShowData(false);
    } else if (index == 2) {
      ShowData(true);
    } else {
      ShowData();
    }
    ul.classList.add("bg-gray-100");
    ul.classList.add("text-blue-700");
  });
});
