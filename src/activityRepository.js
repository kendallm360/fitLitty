import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek,
  getFilteredDataByDate,
} from "./util.js";

export default class ActivityRepository {
  constructor(activityData) {
    this.activityData = activityData;
  }

  getSteps (current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let stepsTaken = getDataByDate(filteredActivity, date, "numSteps");
    return stepsTaken;
  }

  getFlightsClimbed (current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let flightsClimbed = getDataByDate(filteredActivity, date, "flightsOfStairs");
    return flightsClimbed;
  }

  getMilesWalked(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let stepsTaken = getDataByDate(filteredActivity, date, "numSteps");
    let milesWalked = (current_user.strideLength * stepsTaken) / 5280;
    return parseFloat(milesWalked.toFixed(1));
  }


  getMinutesActive(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let minutesActive = getDataByDate(filteredActivity, date, "minutesActive");
    return minutesActive;
  }

  getMinutesActiveByWeek(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let weeklyActivity = getDataByWeek(filteredActivity, date, "minutesActive");
    return weeklyActivity;
  }

  getStepsByWeek(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let weeklyActivity = getDataByWeek(filteredActivity, date, "numSteps");
    return weeklyActivity
  }

  getFlightsByWeek(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let weeklyActivity = getDataByWeek(filteredActivity, date, "flightsOfStairs");
    return weeklyActivity
  }

  determineStepGoal(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let stepsTaken = getDataByDate(filteredActivity, date, "numSteps");
    if (stepsTaken >= current_user.dailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  determineDaysGoalReached(current_user) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let daysGoalReached = filteredActivity
      .filter((day) => day.numSteps >= current_user.dailyStepGoal)
      .map((day) => day.date);
    return daysGoalReached;
  }

  getAllTimeStairRecord(current_user) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let bestDay = filteredActivity.sort(
      (a, b) => b.flightsOfStairs - a.flightsOfStairs
    );
    return bestDay[0].flightsOfStairs;
  }

  getEveryonesAverageStairsClimb(date) {
    let usersDataBydate = getFilteredDataByDate(this.activityData, date);
    let everyonesAverage = getAverage(usersDataBydate, "flightsOfStairs");
    return everyonesAverage;
  }

  getEveryonesAverageStepsTaken(date) {
    let usersDataBydate = getFilteredDataByDate(this.activityData, date);
    let everyonesAverage = getAverage(usersDataBydate, "numSteps");
    return everyonesAverage;
  }

  getEveryonesAverageMinutesActive(date) {
    let usersDataBydate = getFilteredDataByDate(this.activityData, date);
    let everyonesAverage = getAverage(usersDataBydate, "minutesActive");
    return everyonesAverage;
  }
}
