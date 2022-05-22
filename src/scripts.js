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

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

//Query selectors
const contactCard = document.querySelector(".user-info");
const snapshotWidget = document.querySelector("#snapshot");
const hydrationWidget = document.querySelector("#hydration");
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
  ]).then((data) => {
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
  });
};

const createUserRepo = () => {
  userRepo = new UserRepository(userDataInstances());
  currentUser = userRepo.findById(11);
  hydrationRepo = new HydrationRepository(hydrationData);
  sleepRepo = new SleepRepository(sleepData);
};

const displayUserDetails = () => {
  contactCard.innerText = `
  Welcome! ${currentUser.name}
  ${currentUser.address}
  ${currentUser.email}`;
};

const displayTodaysWaterIntake = () => {
  hydrationWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You drank ${hydrationRepo.getFluidIntakeByDate(
    11,
    "2020/01/22"
  )} ounces today`;
};

const setSelectedDate = () => {
  dateSelected.value = "2020-01-22";
};

const displaySnapshotData = () => {
  snapshotWidget.innerHTML += `
  Hey ${currentUser.returnFirstName()}!<br><br>
  Here's a quick snapshot of your day:<br><br>
  You drank ${hydrationRepo.getFluidIntakeByDate(
    11,
    "2020/01/22"
  )} ounces<br><br>
  You slept ${sleepRepo.getSleepByDate(11, "2020/01/22")} hours<br>
  Your average all-time is ${sleepRepo.getAverageSleep(11)} hours<br><br>
  Your sleep quality was ${sleepRepo.getQualityByDate(11, "2020/01/22")}<br>
  Your average quality all-time is ${sleepRepo.getAverageSleepQuality(11)}
  `;
};

const compareSteps = () => {
  const config = createCompareDonut(currentUser, userRepo.getAverageStepGoal());
  const stepComparison = new Chart(stepComparisonDonut, config);
};

const displayWeeklyWaterIntake = () => {
  //refactor date to be dynamic
  let weeklyWaterIntake = hydrationRepo.getDailyFluidIntakeByWeek(
    11,
    "2020/01/22"
  );
  const config = createHydrationChart(weeklyWaterIntake);
  const weeklyHydrationChart = new Chart(weeklyHydration, config);
};

const displayTodaysSleepStats = () => {
  sleepWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You slept ${sleepRepo.getSleepByDate(11, "2020/01/22")} hours today.
  Your sleep quality was ${sleepRepo.getQualityByDate(11, "2020/01/22")}
  `;
};

const displayWeeklySleep = () => {
  let sleep = sleepRepo.getSleepByWeek(11, "2020/01/22");
  let quality = sleepRepo.getQualityByWeek(11, "2020/01/22");
  const config = createSleepChart(sleep, quality);
  return new Chart(weeklySleep, config);
};

const displayAverageSleepData = () => {
  let allTimeSleep = sleepRepo.getAverageSleep(11);
  let allTimeQuality = sleepRepo.getAverageSleepQuality(11);
  sleepWidget.innerHTML += `<br> Your average hours slept: ${allTimeSleep} hours<br>
  Your average sleep quality: ${allTimeQuality}/5
  `;
};

const toggleWidgetSize = (widget) => {
  widget.classList.toggle("widget");
  widget.classList.toggle("resize-widget");
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
  setSelectedDate();
  fetchUsers();
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
