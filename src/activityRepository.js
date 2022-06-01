import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek,
} from "./util.js";

export default class ActivityRepository {
  constructor(activityData) {
    this.activityData = activityData;
  }

  getMilesWalked(current_user, date) {
    let filteredActivity = filterById(current_user.id, this.activityData);
    let stepsTaken = getDataByDate(filteredActivity, date, "numSteps");
    let milesWalked = (current_user.strideLength * stepsTaken) / 5280;
    return parseFloat(milesWalked.toFixed(1));
  }
}
