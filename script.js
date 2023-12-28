const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $("#input");
const task = $(".task");
const button = $("#button");

let list = localStorage.getItem("taskList")
  ? JSON.parse(localStorage.getItem("taskList"))
  : [];

function loadTask() {
  if (list.length != 0) {
    renderTask(list);
  } else {
    task.innerHTML = `<p style="font-size: 18px">You don't have work to do!</p>`;
  }
}

loadTask();

button.onclick = function addTask() {
  let index = this.getAttribute("index");
  if (input.value) {
    if (index) {
      list[index].name = input.value;
      this.removeAttribute("index");
    } else {
      list = [...list, { name: input.value }];
    }
    localStorage.setItem("taskList", JSON.stringify(list));

    renderTask(list);
  } else {
    alert("Please write your work to do");
  }
  input.value = "";
};

function renderTask(list = []) {
  let content = "";

  list.forEach((work, index) => {
    content += `
  <div class="box">
    <div class="icon"></div>
    <li class="text">${work.name}</li>
    <span onclick="setTask(${index})"><i class="fa-solid fa-pen-to-square"></i></span>
    <span onclick="deleteTask(${index})"><i class="fa-solid fa-xmark"></i></span>
  </div>`;
  });

  task.innerHTML = content;
}

function deleteTask(index) {
  list.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(list));
  if (list.length === 0) {
    task.innerHTML = `<p style="font-size: 18px">You don't have work to do!</p>`;
  } else {
    renderTask(list);
  }
}

task.addEventListener("click", function (e) {
  let parent = e.target.parentElement;
  let icon = parent.querySelector(".icon");
  let text = parent.querySelector(".text");
  icon.classList.toggle("checked");
  text.classList.toggle("checked");
});

function setTask(index) {
  input.value = list[index].name;
  button.setAttribute("index", index);
}
