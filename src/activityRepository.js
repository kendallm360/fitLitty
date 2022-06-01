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
  getMilesWalked(id, strideLength, date) {
    let filteredActivity = filterById(id, this.activityData);
    let stepsTaken = getDataByDate(filteredActivity, date, "numSteps");
    let milesWalked = (strideLength * stepsTaken) / 5280;
    return parseFloat(milesWalked.toFixed(1));
  }
}
