import {
  getData
} from './apiCalls.js'

import './css/styles.css';
import './images/turing-logo.png'

import UserRepository from './UserRepository';
import User from './User';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

//Query selectors
const contactCard = document.querySelector(".user-info");
const snapshotWidget = document.querySelector("#snapshot");
const activityWidget = document.querySelector("#activity");
const hydrationWidget = document.querySelector("#hydration");
const sleepWidget = document.querySelector("#sleep");
const dateSelected = document.querySelector(".date-selection");
const buttons= Array.from(document.querySelectorAll(".dataButton"));
const widgets = Array.from(document.querySelectorAll(".widget"));
const weeklyHydration = document.querySelector("#weeklyHydrationChart");
const weeklySleep = document.querySelector("#weeklySleepChart")

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
    // displayTodaysWaterIntake();
    displayWeeklyWaterIntake();
    // displayTodaysSleepStats();
    displayWeeklySleep();
    // displayAverageSleepData();
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
  Hey ${currentUser.returnFirstName()}!<br><br>
  Here's a quick snapshot of your day:<br><br>
  You drank ${userRepo.getFluidIntakeByDate(11, "2020/01/22")} ounces<br><br>
  You slept ${userRepo.getSleepByDate(11, "2020/01/22")} hours<br>
  Your sleep quality was ${userRepo.getQualityByDate(11, "2020/01/22")}
  `
}

function displayWeeklyWaterIntake() {
  //refactor date to be dynamic
  let weeklyWaterIntake = userRepo.getDailyFluidIntakeByWeek(11, "2020/01/22")
  const config = createHydrationChart(weeklyWaterIntake);
  const weeklyHydrationChart = new Chart(weeklyHydration, config)
}

function createHydrationChart(weeklyWaterIntake) {
  const labels = weeklyWaterIntake.map(intake => intake.date);
  const values = weeklyWaterIntake.map(intake => intake.fluidOz)
  const data = {
    labels: labels,
    datasets: [{
      label: "Weekly Hydration",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      data: values
    }]
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      barThickness: 20,
    }
  }
  return config
}

function displayTodaysSleepStats() {
  sleepWidget.innerText = `Hey ${currentUser.returnFirstName()}!
  You slept ${userRepo.getSleepByDate(11, "2020/01/22")} hours today.
  Your sleep quality was ${userRepo.getQualityByDate(11, "2020/01/22")}
  `
};

function displayWeeklySleep() {
  let sleep = userRepo.getSleepByWeek(11, "2020/01/22");
  let quality = userRepo.getQualityByWeek(11, "2020/01/22");
  const config = createSleepChart(sleep, quality)
  return new Chart(weeklySleep, config)
  // sleepWidget.innerHTML += `<br>Your Weekly sleep stats:<br>`
  // weeklySleep.forEach((sleepData, index) => {
  //   sleepWidget.innerHTML += `${sleepData.date}: Hours: ${sleepData.hoursSlept}
  //   Quality: ${weeklyQuality[index].sleepQuality}<br>
  //   `
  // })
};
function createSleepChart(weeklySleep, weeklyQuality) {
  const labels = weeklySleep.map(sleep => sleep.date);
  const sleepValues = weeklySleep.map(sleep => sleep.hoursSlept)
  const qualityValues = weeklyQuality.map(quality => quality.sleepQuality)

  const data = {
    labels: labels,
    datasets: [{
      label: "Weekly Sleep Hours",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1,
      data: sleepValues
    },
    {
      label: "Weekly Sleep Quality",
      backgroundColor: [
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      data: qualityValues
    }]
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      barThickness: 20,
    }
  }
  return config
}

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
