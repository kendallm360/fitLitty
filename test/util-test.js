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
    userSleep = userSleepData;
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
    expect(
      getDataByWeek(userSleepData, "2019/06/21", "hoursSlept")
    ).to.deep.equal(weeklyHoursSlept);
    expect(
      getDataByWeek(userHydration, "2019/06/21", "numOunces")
    ).to.deep.equal(weeklyWater);
  });
});
