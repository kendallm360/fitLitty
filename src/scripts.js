import {
  getSleepData,
  getActivityData,
  getUserData,
  getHydrationData
} from './apiCalls.js'

import './css/styles.css';
import './images/turing-logo.png'

import UserRepository from './UserRepository';
import User from './User';

//Query selectors
const contactCard = document.querySelector(".user-info");
const welcomeUser = document.querySelector(".welcome");
const activityWidget = document.querySelector(".steps");

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
  Promise.all([getUserData(),getSleepData(), getHydrationData(), getActivityData()]).then((data) => {
    userData = data[0].userData;
    sleepData = data[1].sleepData;
    hydrationData = data[2].hydrationData;
    activityData = data[3].activityData;
    createUserRepo();
    displayUserDetails();
    greetUser();
    compareSteps();
  })
}

function createUserRepo() {
  userRepo = new UserRepository(userDataInstances())
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

//eventlistener
window.addEventListener('load', () => {
fetchUsers();
});
