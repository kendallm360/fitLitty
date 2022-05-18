// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';

import UserRepository from './UserRepository';
import User from './User';

//imports

//Query selectors
// Create query selectors to target areas we want info displayed
const contactCard = document.querySelector(".user-info");
const welcomeUser = document.querySelector(".welcome");
const activityWidget = document.querySelector(".steps");

//global variables
let userRepo;
let currentUser;
let userDataInstances;
//functions
// Iterate through user data and create instances of users stored in array in variable(in script.js)
// Create a new UserRepository instance and pass it the users array

userDataInstances = userData.map(function (data) {
        return new User(data)});

function createUserRepo() {
  userRepo = new UserRepository(userDataInstances)
  currentUser = userRepo.findById(10);
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
  activityWidget.innerText = `Hey ${currentUser.name}! This is how your step goal compares to other users!
  Yours: ${currentUser.dailyStepGoal} vs Theirs: ${userRepo.getAverageStepGoal()}`
}
//  function to load info to contact card
//  Function that interpolates users stepgoal compared to other users
//"Heres your step goal compared to others: Yours:   Other users: "

//eventlistener
window.addEventListener('load', () => {
createUserRepo();
displayUserDetails();
greetUser();
compareSteps();

});
