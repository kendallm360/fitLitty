import { getData } from "./apiCalls.js";

import {
  createSleepChart,
  createHydrationChart,
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
// const hydrationWidget = document.querySelector("#hydration");
const sleepWidget = document.querySelector("#sleep");
const dateSelected = document.querySelector(".date-selection");
const buttons = Array.from(document.querySelectorAll(".dataButton"));
const widgets = Array.from(document.querySelectorAll(".widget"));
const weeklyHydration = document.querySelector("#weeklyHydrationChart");
const weeklySleep = document.querySelector("#weeklySleepChart");
const stepComparisonDonut = document.querySelector("#stepComparisonDonut");

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
      displayWelcomeMessage();
      // console.log()
    })
    //Added what Nik suggested verbatim below.
    //Solid example of error handling
    .catch((error) =>
      console.log(error, "Error is coming back from the server")
    );
};

const createUserRepo = () => {
  userRepo = new UserRepository(userDataInstances());
  // currentUser = userRepo.findById(11);
  currentUser = userRepo.generateRandomUser();
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
  dateSelected.value = "2020-01-22";
};

const displaySnapshotData = () => {
  snapshotWidget.innerHTML += `
  Here's a quick snapshot of your day:<br><br>
  You took ${activityRepo.getSteps(currentUser, "2020/01/22")} steps today <br><br>
  You were active for ${activityRepo.getMinutesActive(currentUser, "2020/01/22")} steps today <br><br>
  You drank ${hydrationRepo.getFluidIntakeByDate(
    currentUser.id,
    "2020/01/22"
  )} ounces<br><br>
  You slept ${sleepRepo.getSleepByDate(currentUser.id, "2020/01/22")} hours<br><br>
  Your sleep quality was ${sleepRepo.getQualityByDate(
    currentUser.id,
    "2020/01/22"
  )}<br>
  
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
    "2020/01/22"
  );
  const config = createHydrationChart(weeklyWaterIntake);
  const weeklyHydrationChart = new Chart(weeklyHydration, config);
};

const displayTodaysSleepStats = () => {
  sleepWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You slept ${sleepRepo.getSleepByDate(
    currentUser.id,
    "2020/01/22"
  )} hours today.
  Your sleep quality was ${sleepRepo.getQualityByDate(
    currentUser.id,
    "2020/01/22"
  )}
  `;
};

const displayWeeklySleep = () => {
  let sleep = sleepRepo.getSleepByWeek(currentUser.id, "2020/01/22");
  let quality = sleepRepo.getQualityByWeek(currentUser.id, "2020/01/22");
  const config = createSleepChart(sleep, quality);
  return new Chart(weeklySleep, config);
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
  setSelectedDate();
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.target === "snapshot") {
      displayAllWidgets();
    } else {
      displayActiveWidget(button.dataset.target);
    }
  });
});
