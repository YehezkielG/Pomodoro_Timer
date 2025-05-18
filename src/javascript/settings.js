let settingBtn = document.getElementById("settingBtn");
let setBtn = document.getElementById("set");
let openSetting = false;

settingBtn.addEventListener("click",()=>{
    document.getElementById("settings").classList.remove("hidden")
})
setBtn.addEventListener("click",()=>{
    document.getElementById("settings").classList.add("hidden")
})