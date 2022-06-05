import { getData, postData } from "./apiCalls.js";

import {
  createSleepChart,
  createHydrationChart,
  createActivityChart,
  createCompareDonut,
} from "./graphs.js";

import "./css/styles.css";
import "./images/turing-logo.png";

import UserRepository from "./UserRepository";
import User from "./User";
import HydrationRepository from "./HydrationRepository.js";
import SleepRepository from "./SleepRepository";
import ActivityRepository from "./activityRepository";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

//Query selectors
const welcomeMessage = document.querySelector(".welcome");
const contactCard = document.querySelector(".user-info");
const snapshotWidget = document.querySelector("#snapshot");
const allUsersActivityWidget = document.querySelector("#all-users-activity");
const sleepWidget = document.querySelector("#sleep");
const dateSelected = document.querySelector(".dateSelection");
const buttons = Array.from(document.querySelectorAll(".dataButton"));
const widgets = Array.from(document.querySelectorAll(".widget"));
const weeklyHydration = document.querySelector("#weeklyHydrationChart");
const weeklySleep = document.querySelector("#weeklySleepChart");
const weeklyActivity = document.querySelector("#weeklyActivityChart");
const stepComparisonDonut = document.querySelector("#stepComparisonDonut");
const postForm = document.querySelector("#post-input");
const postMessage = document.querySelector("#post-message");

//global variables
let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;
let currentUser;
let userData;
let sleepData;
let hydrationData;
let activityData;
let currentDate;
let dailyActivityPosted;
let dailySleepPosted;
let dailyHydrationPosted;
let weeklyActivityChart = new Chart("weeklyActivityChart", { type: "line" });
let weeklyHydrationChart = new Chart("weeklyHydrationChart", { type: "bar" });
let weeklySleepChart = new Chart("weeklySleepChart", { type: "bar" });
let stepComparisonChart = new Chart("stepComparisonDonut", { type: "doughnut", options: {
  layout: {
    padding: 20,
  },
  maintainAspectRatio: false
} });

//functions
const userDataInstances = () => {
  return userData.map(function (data) {
    return new User(data);
  });
};

const fetchUsers = () => {
  Promise.all([
    getData("users"),
    getData("sleep"),
    getData("hydration"),
    getData("activity"),
  ])
    .then((data) => {
      userData = data[0].userData;
      sleepData = data[1].sleepData;
      hydrationData = data[2].hydrationData;
      activityData = data[3].activityData;
      createUserRepo();
      displayUserDetails();
      displaySnapshotData();
      compareSteps();
      displayWeeklyWaterIntake();
      displayWeeklySleep();
      displayWeeklyActivity();
      displayAllUsersActivity();
      displayWelcomeMessage();
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
  //Added what Nik suggested verbatim below.
  //Solid example of error handling
};

const createUserRepo = () => {
  userRepo = new UserRepository(userDataInstances());
  if (!currentUser) {
    currentUser = userRepo.generateRandomUser();
  }
  hydrationRepo = new HydrationRepository(hydrationData);
  sleepRepo = new SleepRepository(sleepData);
  activityRepo = new ActivityRepository(activityData);
};

const displayWelcomeMessage = () => {
  welcomeMessage.innerText = `Welcome ${currentUser.returnFirstName()}!`;
};

const displayUserDetails = () => {
  contactCard.innerHTML = `
  <br><br>
  User Contact Card:<br><br>
  Address:<br>
  ${currentUser.address}<br><br>
  Email:
  ${currentUser.email}<br><br>
  Stride Length:
  ${currentUser.strideLength}<br><br>
  Daily Step Goal:
  ${currentUser.dailyStepGoal}<br><br>
  `;
};

const setDate = (event) => {
  currentDate = event.target.value.split("-").join("/");
  return currentDate;
};

const getTodaysDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return yyyy + '/' + mm + '/' + dd;
}

const setDefaultDate = () => {
  currentDate = "2019/12/18";
  return currentDate;
};

const displaySnapshotData = () => {
  snapshotWidget.innerHTML = ''
  snapshotWidget.innerHTML += `
  Here's a quick snapshot of your day:<br><br>
  You took ${activityRepo.getSteps(
    currentUser,
    currentDate
  )} steps today <br><br>
  You were active for ${activityRepo.getMinutesActive(
    currentUser,
    currentDate
  )} minutes today <br><br>
  You walked ${activityRepo.getMilesWalked(
    currentUser,
    currentDate
  )} miles today <br><br>
  You drank ${hydrationRepo.getFluidIntakeByDate(
    currentUser.id,
    currentDate
  )} ounces<br><br>
  You slept ${sleepRepo.getSleepByDate(
    currentUser.id,
    currentDate
  )} hours<br><br>
  Your sleep quality was ${sleepRepo.getQualityByDate(
    currentUser.id,
    currentDate
  )}<br>

  `;
};

const displayAllUsersActivity = () => {
  allUsersActivityWidget.innerHTML = '';
  allUsersActivityWidget.innerHTML += `
  Check out other users activity today <br><br>
  They averaged <br><br>
   ${activityRepo.getEveryonesAverageStepsTaken(currentDate)} steps. <br><br>
   ${activityRepo.getEveryonesAverageMinutesActive(
     currentDate
   )} minutes of activity. <br><br>
   ${activityRepo.getEveryonesAverageStairsClimb(
     currentDate
   )} stairs climbed. <br><br>
  `;
};

const compareSteps = () => {
  let updatedChart = createCompareDonut(currentUser, userRepo.getAverageStepGoal(), stepComparisonChart);
  updatedChart.update();
};

const displayWeeklyWaterIntake = () => {
  let weeklyWaterIntake = hydrationRepo.getDailyFluidIntakeByWeek(
    currentUser.id,
    currentDate
  );
  createHydrationChart(weeklyWaterIntake, weeklyHydrationChart);
};

const displayTodaysSleepStats = () => {
  sleepWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You slept ${sleepRepo.getSleepByDate(
    currentUser.id,
    currentDate
  )} hours today.
  Your sleep quality was ${sleepRepo.getQualityByDate(
    currentUser.id,
    currentDate
  )}
  `;
};

const displayWeeklySleep = () => {
  let sleep = sleepRepo.getSleepByWeek(currentUser.id, currentDate);
  let quality = sleepRepo.getQualityByWeek(currentUser.id, currentDate);
  createSleepChart(sleep, quality, weeklySleepChart);
};

const displayWeeklyActivity = () => {
  let steps = activityRepo.getStepsByWeek(currentUser, currentDate);
  let flights = activityRepo.getFlightsByWeek(currentUser, currentDate);
  let minutes = activityRepo.getMinutesActiveByWeek(currentUser, currentDate);
  createActivityChart(steps, flights, minutes, weeklyActivityChart);
};

const displayActiveWidget = (selection) => {
  widgets.forEach((widget) => {
    if (widget.classList.contains(selection)) {
      widget.style.display = "flex";
      widget.classList.add("resize-widget");
      widget.classList.remove("widget");
      // widget.classList.remove("hidden");
    } else {
      widget.style.display = "none";
    }
  });
};

// const displayActiveWidget = (selection) => {
//   widgets.forEach((widget) => {
//     if (selection === widget.id) {
//       widget.style.display = "flex";
//       widget.classList.add("resize-widget");
//       widget.classList.remove("widget");
//     } else {
//       widget.style.display = "none";
//     }
//   });
// };

const displayAllWidgets = () => {
  widgets.forEach((widget) => {
    if (widget.id === 'activity' || widget.id === 'all-users-activity'){
      widget.style.display = "none";
    } else {
      widget.style.display = "flex";
      widget.classList.add("widget");
      widget.classList.remove("resize-widget");
    }
   
  });
};

const displayPostForm = (identifier) => {
  if(identifier == "activity" && !dailyActivityPosted){
    addActivityLabels();
  }else if(identifier == "hydration" && !dailyHydrationPosted){
    addHydrationLabels();
  }else if(identifier == "sleep" && !dailySleepPosted){
    addSleepLabels();
  }else {
    clearForm();
    toggleMessage();
  }
};

const clearForm = () => {
  postForm.innerHTML = '';
}

const addActivityLabels = () => {
  postForm.innerHTML = '';
  postForm.innerHTML += `
    <label for="numSteps">Number of Steps</label><br>
    <input type="text" name="numSteps"><br><br>
    <label for="minutesActive">Minutes Active</label><br>
    <input type="text" name="minutesActive"><br><br>
    <label for="flightsOfStairs">Flights of Stairs Climbed</label><br>
    <input type="text" name="flightsOfStairs"><br><br>
    <input type="submit" class="activity"id="submit" value="Submit">
  `
}

const addHydrationLabels = () => {
  postForm.innerHTML = '';
  postForm.innerHTML += `
    <label for="numOunces" >Number of Ounces</label><br>
    <input type="text" name="numOunces" ><br><br>
    <input type="submit" class="hydration"id="submit" value="Submit" >
  `
}

const addSleepLabels = () => {
  postForm.innerHTML = '';
  postForm.innerHTML += `
    <label for="hoursSlept">Number of Hours Slept</label><br>
    <input type="text" name="hoursSlept"><br><br>
    <label for="sleepQuality">Sleep Quality</label><br>
    <input type="text" name="sleepQuality"><br><br>
    <input type="submit" class="sleep"id="submit" value="Submit">
  `
}

const toggleMessage = () => {
  postMessage.classList.toggle("hidden")
}

const updateTypePosted = (apiName) => {
  if(apiName == "activity"){
    dailyActivityPosted = true
  }else if(apiName == "sleep"){
      dailySleepPosted = true
  }else if(apiName == "hydration"){
      dailyHydrationPosted = true
  }
}

//eventlistener
window.addEventListener("load", () => {
  fetchUsers();
  setDefaultDate();
});

dateSelected.addEventListener("change", (event) => {
  setDate(event);
  displayWeeklyActivity();
  displayWeeklyWaterIntake();
  displayWeeklySleep();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.target === "snapshot") {
      displayAllWidgets();
      clearForm();
      postMessage.classList.add("hidden")
    } else {
      displayActiveWidget(button.dataset.target);
      postMessage.classList.add("hidden")
      displayPostForm(button.dataset.target)
      console.log(
        dateSelected.value.split("-").join("/"),
        "dateSelected.value"
      );
      console.log(currentDate, "currentDate");
    }
  });
});

postForm.addEventListener("click", () => {
  if (event.target.id == "submit") {
    event.preventDefault()
    let form = event.target.closest("form");
    let inputs = Array.from(form.querySelectorAll("input[type=text]"))
    let formData = inputs.reduce((acc, input) => {
      acc[input.name] = input.value
      return acc
    },{})
    formData["userID"] = currentUser.id
    formData["date"] = getTodaysDate();
    let apiName = postForm.querySelector("#submit").className
    updateTypePosted(apiName)
    postData(apiName, formData)
    currentDate = getTodaysDate()
    clearForm();
    toggleMessage()
    fetchUsers();
  }
})
