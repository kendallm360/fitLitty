import { expect } from "chai";
import { sleepData } from "./mockData/mock";

describe("Sleep Data", () => {
  let userRepo;

  beforeEach(() => {
    userRepo = sleepData;
  });

  it("should take in sleep data", () => {
    expect(userRepo.sleepData).to.deep.equal(sleepData.sleepData);
  });

  it("should show average of hours slept per day for a user", () => {
    expect(userRepo.getAverageSleep(1)).to.equal(7);
  });

  it("should show average sleep quality per day", () => {
    expect(userRepo.getAverageSleepQuality(1)).to.equal(3);
  });

  it("should show how many hours user slept for specific day", () => {
    expect(userRepo.getSleepByDate(1, "2019/06/17")).to.equal(8);
  });

  it("should show sleep quality for a user on a specific day", () => {
    expect(userRepo.getQualityByDate(1, "2019/06/17")).to.equal(3);
  });

  it("should show user hours of sleep for each day over given week", () => {
    expect(userRepo.getSleepByWeek(1, "2019/06/21")).to.deep.equal([
      { date: "2019/06/15", hoursSlept: 6 },
      { date: "2019/06/16", hoursSlept: 7 },
      { date: "2019/06/17", hoursSlept: 8 },
      { date: "2019/06/18", hoursSlept: 5 },
      { date: "2019/06/19", hoursSlept: 7 },
      { date: "2019/06/20", hoursSlept: 7 },
      { date: "2019/06/21", hoursSlept: 9 },
    ]);
  });

  it("should show user sleep quality each day over give week", () => {
    expect(userRepo.getQualityByWeek(1, "2019/06/21")).to.deep.equal([
      { date: "2019/06/15", sleepQuality: 2 },
      { date: "2019/06/16", sleepQuality: 2 },
      { date: "2019/06/17", sleepQuality: 3 },
      { date: "2019/06/18", sleepQuality: 3 },
      { date: "2019/06/19", sleepQuality: 2 },
      { date: "2019/06/20", sleepQuality: 4 },
      { date: "2019/06/21", sleepQuality: 1 },
    ]);
  });

  it("should return average sleep quality for all users", () => {
    expect(userRepo.getAverageSleepQualityAll()).to.equal(3);
  });
});
