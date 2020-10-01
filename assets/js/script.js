var past_task_color = "#d3d3d3";
var current_task_color = "#ff6961";
var future_task_color = "#77dd77";

// Add a class on an html element using vanilla javascript
// var jumbotron = document.querySelector(".jumbotron");
// jumbotron.className = "hello";
// jumbotron.classList.add("hello");

// var jumbotron = $(".jumbotron");
// jumbotron.addClass("hello");

var currentDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDate);

var tasks = JSON.parse(localStorage.getItem("tasks"));
var timeSlots = $(".to-do").toArray();

// This function is checking to see whether time blocks are in the past, present, or future.
function setTimeSlotColors() {
  var currentTime = moment().format("H");

  for (var i = 0; i < timeSlots.length; i++) {
    if (timeSlots[i].id === currentTime) {
      timeSlots[i].style.backgroundColor = current_task_color;
    } else if (parseInt(timeSlots[i].id) > parseInt(currentTime)) {
      timeSlots[i].style.backgroundColor = future_task_color;
    } else if (parseInt(timeSlots[i].id) < parseInt(currentTime)) {
      timeSlots[i].style.backgroundColor = past_task_color;
    }
  }
}

// This function loads any saved tasks from storage.
function getStoredTasks() {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  $(".display-text").each(function (index, element) {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].pID == element.id) {
        element.textContent = tasks[i].task;
      }
    }
  });
}

$(".to-do").on("click", function () {
  $(".save-button").each(function (index, element) {
    element.style.opacity = 0.2;
  });

  $(this).parent().children(".save-button")[0].style.opacity = 1;
});

$(".save-button").on("click", function () {
  $(".save-button").each(function (index, element) {
    element.style.opacity = 0.7;
  });

  var currentTaskForm = $(this).siblings(".to-do").children(".description")[0];

  var taskDescription = currentTaskForm.value;

  currentTaskForm.style.visibility = "hidden";

  var currentTask = {
    task: taskDescription,
  };
  tasks.push(currentTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

$("#remove-tasks").on("click", function () {
  localStorage.clear();
  location.reload();
});

setTimeSlotColors();
getStoredTasks();
