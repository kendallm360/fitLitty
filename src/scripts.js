import {
  getData
} from './apiCalls.js'

import './css/styles.css';
import './images/turing-logo.png'

import UserRepository from './UserRepository';
import User from './User';

// import {
//   filterById,
//   getAverage,
//   getDataByDate,
//   getDataByWeek
// } from './util.js'

//Query selectors
const contactCard = document.querySelector(".user-info");
const welcomeUser = document.querySelector(".welcome");
const activityWidget = document.querySelector(".steps");
const hydrationWidget = document.querySelector(".hydration");
const dateSelected = document.querySelector(".date-selection");
const sleepWidget = document.querySelector(".sleep");

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
    greetUser();
    compareSteps();
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
  Name: ${currentUser.name}
  Address: ${currentUser.address}
  Email: ${currentUser.email}`;
}

function greetUser () {
  welcomeUser.innerText = `Welcome, ${currentUser.returnFirstName()}!`
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
    sleepWidget.innerHTML += `${sleepData.date}:<br> Hours: ${sleepData.hoursSlept}
    Quality: ${weeklyQuality[index].sleepQuality} 
    `
  })
};

function displayAverageSleepData() {
  let allTimeSleep = userRepo.getAverageSleep(11)
  let allTimeQuality = userRepo.getAverageSleepQuality(11)
  sleepWidget.innerHTML += `<br> Your average hours slept: ${allTimeSleep} hours<br>
  Your average sleep quality: ${allTimeQuality}
  `
}

// "2020/01/22"

//eventlistener
window.addEventListener('load', () => {
setSelectedDate();
fetchUsers();
});
