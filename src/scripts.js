import {
  getData
} from './apiCalls.js'

import './css/styles.css';
import './images/turing-logo.png'

import UserRepository from './UserRepository';
import User from './User';

//Query selectors
const contactCard = document.querySelector(".user-info");
const welcomeUser = document.querySelector(".welcome");
const activityWidget = document.querySelector(".steps");
const hydrationWidget = document.querySelector(".hydration");
const dateSelected = document.querySelector(".date-selection")

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
  })
}

function createUserRepo() {
  userRepo = new UserRepository(userDataInstances(), hydrationData)
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
  hydrationWidget.innerText += `
  Your Weekly water intake:
  ${weeklyWaterIntake[0].date} : ${weeklyWaterIntake[0].fluidOz} oz
  ${weeklyWaterIntake[1].date} : ${weeklyWaterIntake[1].fluidOz} oz
  ${weeklyWaterIntake[2].date} : ${weeklyWaterIntake[2].fluidOz} oz
  ${weeklyWaterIntake[3].date} : ${weeklyWaterIntake[3].fluidOz} oz
  ${weeklyWaterIntake[4].date} : ${weeklyWaterIntake[4].fluidOz} oz
  ${weeklyWaterIntake[5].date} : ${weeklyWaterIntake[5].fluidOz} oz
  ${weeklyWaterIntake[6].date} : ${weeklyWaterIntake[6].fluidOz} oz
  `
}

//"2020/01/22"

//eventlistener
window.addEventListener('load', () => {
setSelectedDate();
fetchUsers();
});
