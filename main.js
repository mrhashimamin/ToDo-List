let DelBtn = document.getElementById("del_btn");
let AllTasks = document.getElementsByClassName("new_task_div");
DelBtn.addEventListener("click", () => {
  this.sessionStorage.clear();
  while (AllTasks.length > 0) {
    AllTasks[0].remove();
  }
  this.location.reload();
});

let upBtn = document.getElementById("up_btn");
window.onscroll = () => {
  if (window.scrollY >= 300) {
    upBtn.style.display = "flex";
    upBtn.style.transition = "0.3s linear";
  } else {
    upBtn.style.display = "none";
  }
};
upBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function StoreSession(usrDataKey, usrDataVal) {
  console.log("%cstore to session", "color:brown;font-size:20px");
  var usrDatObj = JSON.parse(sessionStorage.getItem("usrDatObj")) || [];
  var newObj = {};
  newObj[usrDataKey] = usrDataVal;
  usrDatObj.push(newObj);
  sessionStorage.setItem("usrDatObj", JSON.stringify(usrDatObj));
  return usrDatObj;
}

let usrTask = document.getElementById("usr_task_inp");
let addBtn = document.getElementById("add_btn");
let usrTaskVal = "";

let usrDatObjSearch = JSON.parse(sessionStorage.getItem("usrDatObj"));

function ToDo_List_Re() {
  this.addEventListener("load", () => {
    let myTaskForm = document.querySelector(".new_task_div");
    let myAllTasks = document.querySelectorAll(".active");
    myAllTasks.forEach((task) => {
      task.classList.remove("active");
    });

    let usrDatObjSearch = JSON.parse(sessionStorage.getItem("usrDatObj"));
    for (let j = 0; j < usrDatObjSearch.length; j++) {
      let myDupliTask = myTaskForm.cloneNode(true);
      myDupliTask.classList.add("active");
      myDupliTask.style.display = "flex";
      myDupliTask.style.filter = "saturate(0.7)";
      myDupliTask.querySelector(".new_task_inp").value =
        usrDatObjSearch[j].usrTask;
      task_form.appendChild(myDupliTask);
    }
  });
}

if (usrDatObjSearch) {
  ToDo_List_Re();
} else {
  console.log(
    "%cNo previous DATA Found in session storage",
    "color:red;font-size:15px"
  );
}

document.addEventListener("click", (e) => {
  if (e.target.className == "comp_btn") {
    let myTarget = e.target.parentNode;
    myTarget.classList.toggle("completed_task");
    let myIcon = myTarget.querySelector(".fa-solid");
    myIcon.classList.toggle("fa-check");
    myIcon.classList.toggle("fa-check-double");
  }
});

addBtn.addEventListener("click", () => {
  console.log("%cGetting task from usrInp", "color:orange;font-size:20px");
  if (usrTask.value.trim().length >= 1) {
    document.querySelector("span").style.display = "none";
    usrTaskVal = usrTask.value.trim();
    let myRes = StoreSession("usrTask", usrTaskVal);
    console.log("%cMaking new task form", "color:yellow;font-size:20px");
    let myTaskForm = document.querySelector(".new_task_div");
    let myAllTasks = document.querySelectorAll(".active");
    myAllTasks.forEach((task) => {
      task.classList.remove("active");
    });
    let myDupliTask = myTaskForm.cloneNode(true);
    myDupliTask.classList.add("active");
    myDupliTask.style.display = "flex";
    myDupliTask.style.transition = "0.3s ease";
    console.log(
      "%cGetting the task from session",
      "color:green;font-size:20px"
    );
    let usrDatObj = JSON.parse(sessionStorage.getItem("usrDatObj"));
    for (let j = 0; j < usrDatObj.length; j++) {
      myDupliTask.querySelector(".new_task_inp").value = usrDatObj[j].usrTask;
    }
    task_form.prepend(myDupliTask);
    document.getElementById("usr_task_inp").value = "";
  } else {
    console.error("No task found");
    document.querySelector("span").style.display = "flex";
  }
});
