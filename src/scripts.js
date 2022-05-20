import {
  getData
} from './apiCalls.js'

import './css/styles.css';
import './images/turing-logo.png'

import UserRepository from './UserRepository';
import User from './User';

//Query selectors
const contactCard = document.querySelector(".user-info");
const snapshotWidget = document.querySelector("#snapshot");
const activityWidget = document.querySelector("#activity");
const hydrationWidget = document.querySelector("#hydration");
const sleepWidget = document.querySelector("#sleep");
const dateSelected = document.querySelector(".date-selection");
const buttons= Array.from(document.querySelectorAll(".dataButton"));
const widgets = Array.from(document.querySelectorAll(".widget"));
//global variables
let userRepo;
let currentUser;
let userData;
let sleepData;
let hydrationData;
let activityData;

//functions
function userDataInstances() {
  return userData.map(function (data) {
    return new User(data)
  });
}

function fetchUsers() {
  Promise.all([getData("users"),getData("sleep"), getData("hydration"), getData("activity")]).then((data) => {
    userData = data[0].userData;
    sleepData = data[1].sleepData;
    hydrationData = data[2].hydrationData;
    activityData = data[3].activityData;
    createUserRepo();
    displayUserDetails();
    compareSteps();
    displaySnapshotData();
    displayTodaysWaterIntake();
    displayWeeklyWaterIntake();
    displayTodaysSleepStats();
    displayWeeklySleep();
    displayAverageSleepData();
  })
}

function createUserRepo() {
  userRepo = new UserRepository(userDataInstances(), hydrationData, sleepData)
  currentUser = userRepo.findById(11);
};

function displayUserDetails(){
  contactCard.innerText = `
  Welcome! ${currentUser.name}
  ${currentUser.address}
  ${currentUser.email}`;
}

function compareSteps() {
  activityWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  This is how your step goal compares to other users!
  Yours: ${currentUser.dailyStepGoal} vs Theirs: ${userRepo.getAverageStepGoal()}`

}

function displayTodaysWaterIntake() {
  hydrationWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You drank ${userRepo.getFluidIntakeByDate(11, "2020/01/22")} ounces today`
}

function setSelectedDate() {
   dateSelected.value = "2020-01-22";
}

function displaySnapshotData() {
  snapshotWidget.innerHTML += `
  Hey ${currentUser.returnFirstName()}!
  Here's a quick snapshot of your day:<br><br>
  You drank ${userRepo.getFluidIntakeByDate(11, "2020/01/22")} ounces<br><br>
  You slept ${userRepo.getSleepByDate(11, "2020/01/22")} hours<br>
  Your sleep quality was ${userRepo.getQualityByDate(11, "2020/01/22")}
  `
}

function displayWeeklyWaterIntake() {
  //refactor date to be dynamic
  let weeklyWaterIntake = userRepo.getDailyFluidIntakeByWeek(11, "2020/01/22")
  hydrationWidget.innerHTML += `<br>Your Weekly water intake:<br>`
  weeklyWaterIntake.forEach((intake) => {
    hydrationWidget.innerHTML += `${intake.date} : ${intake.fluidOz} oz<br>`
  })
}

function displayTodaysSleepStats() {
  sleepWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You slept ${userRepo.getSleepByDate(11, "2020/01/22")} hours today.
  Your sleep quality was ${userRepo.getQualityByDate(11, "2020/01/22")}
  `
};

function displayWeeklySleep() {
  let weeklySleep = userRepo.getSleepByWeek(11, "2020/01/22");
  let weeklyQuality = userRepo.getQualityByWeek(11, "2020/01/22");
  sleepWidget.innerHTML += `<br>Your Weekly sleep stats:<br>`
  weeklySleep.forEach((sleepData, index) => {
    sleepWidget.innerHTML += `${sleepData.date}: Hours: ${sleepData.hoursSlept}
    Quality: ${weeklyQuality[index].sleepQuality}<br>
    `
  })
};

function displayAverageSleepData() {
  let allTimeSleep = userRepo.getAverageSleep(11)
  let allTimeQuality = userRepo.getAverageSleepQuality(11)
  sleepWidget.innerHTML += `<br> Your average hours slept: ${allTimeSleep} hours<br>
  Your average sleep quality: ${allTimeQuality}
  `
};

function displayActiveWidget(selection) {
  widgets.forEach((widget) => {
    if(selection === widget.id){
      widget.style.display = "flex"
    }else{
      widget.style.display = "none";
    }
  })
}

//eventlistener
window.addEventListener('load', () => {
setSelectedDate();
fetchUsers();
});

buttons.forEach((button) => {
  button.addEventListener('click', () => {
  displayActiveWidget(button.dataset.target)
  })
})
