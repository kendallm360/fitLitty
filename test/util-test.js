import { expect } from "chai";
import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek,
} from "../src/util.js";
import {
  userHydrationData,
  userSleepData,
  weeklyHoursSlept,
  weeklyWater,
} from "./mockData/mock";

describe("util", () => {
  let userHydration;
  let userSleep;
  let waterInfo;
  let sleepInfo;

  beforeEach(() => {
    userHydration = userHydrationData;
    // userHydrationData = [
    //     { userID: 1, date: "2019/06/14", numOunces: 96 },
    //     { userID: 1, date: "2019/06/15", numOunces: 37 },
    //     { userID: 1, date: "2019/06/16", numOunces: 69 },
    //     { userID: 1, date: "2019/06/17", numOunces: 96 },
    //     { userID: 1, date: "2019/06/18", numOunces: 69 },
    //     { userID: 1, date: "2019/06/19", numOunces: 96 },
    //     { userID: 1, date: "2019/06/20", numOunces: 69 },
    //     { userID: 1, date: "2019/06/21", numOunces: 96 },
    //     { userID: 1, date: "2019/06/22", numOunces: 96 },
    //   ];
    userSleep = userSleepData;
    // userSleepData = [
    //   { userID: 1, date: "2019/06/15", hoursSlept: 6.1, sleepQuality: 2.2 },
    //   { userID: 1, date: "2019/06/16", hoursSlept: 6.6, sleepQuality: 2 },
    //   { userID: 1, date: "2019/06/17", hoursSlept: 8.2, sleepQuality: 3 },
    //   { userID: 1, date: "2019/06/18", hoursSlept: 5.0, sleepQuality: 2.7 },
    //   { userID: 1, date: "2019/06/19", hoursSlept: 6.5, sleepQuality: 2.3 },
    //   { userID: 1, date: "2019/06/20", hoursSlept: 7.0, sleepQuality: 4 },
    //   { userID: 1, date: "2019/06/21", hoursSlept: 8.5, sleepQuality: 1.2 },
    //   { userID: 1, date: "2019/06/22", hoursSlept: 6.5, sleepQuality: 3.1 },
    //   { userID: 1, date: "2019/06/23", hoursSlept: 6.7, sleepQuality: 4.4 },
    //   { userID: 1, date: "2019/06/24", hoursSlept: 7.5, sleepQuality: 4.8 },
    // ];
    waterInfo = weeklyWater;
    sleepInfo = weeklyHoursSlept;
  });

  it("should filter a dataset by id", () => {
    expect(filterById(1, userHydration)).to.deep.equal(userHydration);
    expect(filterById(1, userSleep)).to.deep.equal(userSleep);
  });

  it("should be able to get a rounded average from a dataset", () => {
    expect(getAverage(userSleep, "hoursSlept")).to.equal(7);
    expect(getAverage(userHydration, "numOunces")).to.equal(80);
  });

  it("should be able to get a specific piece of data by date, rounded to nearest whole number", () => {
    expect(getDataByDate(userSleep, "2019/06/18", "hoursSlept")).to.equal(5);
    expect(getDataByDate(userHydration, "2019/06/21", "numOunces")).to.equal(
      96
    );
  });

  it("should get a specific piece of data for a whole week specified by last date of week, rounded to nearest whole number", () => {
    // let weeklyHoursSlept = [
    //   { date: "2019/06/15", hoursSlept: 6 },
    //   { date: "2019/06/16", hoursSlept: 7 },
    //   { date: "2019/06/17", hoursSlept: 8 },
    //   { date: "2019/06/18", hoursSlept: 5 },
    //   { date: "2019/06/19", hoursSlept: 7 },
    //   { date: "2019/06/20", hoursSlept: 7 },
    //   { date: "2019/06/21", hoursSlept: 9 },
    // ];
    // let weeklyWater = [
    //   { date: "2019/06/15", numOunces: 37 },
    //   { date: "2019/06/16", numOunces: 69 },
    //   { date: "2019/06/17", numOunces: 96 },
    //   { date: "2019/06/18", numOunces: 69 },
    //   { date: "2019/06/19", numOunces: 96 },
    //   { date: "2019/06/20", numOunces: 69 },
    //   { date: "2019/06/21", numOunces: 96 },
    // ];
    expect(
      getDataByWeek(userSleepData, "2019/06/21", "hoursSlept")
    ).to.deep.equal(weeklyHoursSlept);
    expect(
      getDataByWeek(userHydration, "2019/06/21", "numOunces")
    ).to.deep.equal(weeklyWater);
  });
});
