var current_task_color = '#ff6961';
var future_task_color = '#77dd77';

var currentDate = moment().format('dddd, MMMM Do');
$("#currentDay").text(currentDate);

var tasks = JSON.parse(localStorage.getItem("tasks"));
var timeSlots = $(".to-do").toArray();

// This function is checking to see whether time blocks are in the past, present, or future.
function setTimeSlotColors() {
    var currentTime = moment().format('kk');

    for (var i = 0; i < timeSlots.length; i++) {
        if (parseInt(timeSlots[i].id) == (currentTime)) {
            timeSlots[i].style.backgroundColor = current_task_color;
        } else if (parseInt(timeSlots[i].id) > currentTime) {
            timeSlots[i].style.backgroundColor = future_task_color;
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
    })
}


$(".to-do").on("click", function () {
    $(".save-button").each(function (index, element) {
        element.style.opacity = 0.2;
    })

    $(this).parent().children(".save-button")[0].style.opacity = 1;

    $(".form-control").each(function (index, element) {
        element.style.visibility = "hidden";
    })

    var formZoneID = "#input-form-" + ($(this)[0].id);
    $(formZoneID)[0].style.visibility = "visible";
});

$(".save-button").on("click", function () {
    $(".save-button").each(function (index, element) {
        element.style.opacity = (0.7);
    })


    var currentTaskForm = $(this).parent().children(".to-do").children(".form-control")[0];

    var currentP = $(this).parent().children(".to-do").children(".display-text")[0];
    var taskDescription = currentTaskForm.value;

    currentP.textContent = taskDescription;
    currentTaskForm.style.visibility = "hidden";

    var currentTask = {
        "pID": currentP.id,
        "task": taskDescription
    }
    tasks.push(currentTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

$("#remove-tasks").on("click", function () {
    localStorage.clear();
    location.reload();
});


setTimeSlotColors();
getStoredTasks();