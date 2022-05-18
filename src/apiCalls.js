// Your fetch requests will live here!

function getUserData() {
  return fetch('https://fitlit-api.herokuapp.com/api/v1/users')
  .then(response => response.json())
};

function getSleepData() {
  return fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
  .then(response => response.json())
};

function getActivityData() {
  return fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
  .then(response => response.json())
};

function getHydrationData() {
  return fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
  .then(response => response.json())
};

export {
  getSleepData,
  getActivityData,
  getUserData,
  getHydrationData
}
