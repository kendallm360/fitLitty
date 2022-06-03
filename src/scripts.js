import { getData } from "./apiCalls.js";

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
// const hydrationWidget = document.querySelector("#hydration");
const sleepWidget = document.querySelector("#sleep");
const dateSelected = document.querySelector(".dateSelection");
const buttons = Array.from(document.querySelectorAll(".dataButton"));
const widgets = Array.from(document.querySelectorAll(".widget"));
const weeklyHydration = document.querySelector("#weeklyHydrationChart");
const weeklySleep = document.querySelector("#weeklySleepChart");
const weeklyActivity = document.querySelector("#weeklyActivityChart");
const stepComparisonDonut = document.querySelector("#stepComparisonDonut");

//global variables
let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;
let currentUser;
// let currentDate;
let userData;
let sleepData;
let hydrationData;
let activityData;
// let currentDate = "2019/12/18";
let currentDate = dateSelected.value.split("-").join("/") || "2019/12/18";
// let currentDate = dateSelected.value.split("-").join("/");
let weeklyActivityChart = new Chart("weeklyActivityChart", { type: "line" });
let weeklyHydrationChart = new Chart("weeklyHydrationChart", { type: "bar" });
let weeklySleepChart = new Chart("weeklySleepChart", { type: "bar" });

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
      console.log("current date", currentDate);
    })
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
  //Added what Nik suggested verbatim below.
  //Solid example of error handling
};

const createUserRepo = () => {
  userRepo = new UserRepository(userDataInstances());
  // currentUser = userRepo.findById(11);
  currentUser = userRepo.generateRandomUser();
  // currentDate = dateSelected.value.split("-").join("/") || "2019/12/18";
  // currentDate = dateSelected.valueAsDate;
  // currentDate = dayjs("2019-12-18");
  // currentDate = new Date();
  // currentDate = dayjs(dateSelected.value).format("YYYY/MM/DD");
  // setSelectedDate();
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

const setSelectedDate = () => {
  // dateSelected.value = currentDate;
  return currentDate;
};

const setDate = (event) => {
  currentDate = event.target.value.split("-").join("/");
  return currentDate;
};

const setDefaultDate = () => {
  currentDate = "2019/12/18";
  return currentDate;
};

const displaySnapshotData = () => {
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

// Your average all-time is ${sleepRepo.getAverageSleep(
//   currentUser.id
// )} hours<br><br>

// Your average quality all-time is ${sleepRepo.getAverageSleepQuality(
//   currentUser.id
// )}

const compareSteps = () => {
  const config = createCompareDonut(currentUser, userRepo.getAverageStepGoal());
  const stepComparison = new Chart(stepComparisonDonut, config);
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
    if (selection === widget.id) {
      widget.style.display = "flex";
      widget.classList.add("resize-widget");
      widget.classList.remove("widget");
    } else {
      widget.style.display = "none";
    }
  });
};

const displayAllWidgets = () => {
  widgets.forEach((widget) => {
    widget.style.display = "flex";
    widget.classList.add("widget");
    widget.classList.remove("resize-widget");
  });
};

//eventlistener
window.addEventListener("load", () => {
  fetchUsers();
  // setSelectedDate();
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
    } else {
      displayActiveWidget(button.dataset.target);
      console.log(
        dateSelected.value.split("-").join("/"),
        "dateSelected.value"
      );
      console.log(currentDate, "currentDate");
    }
  });
});
