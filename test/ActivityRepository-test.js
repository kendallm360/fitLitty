import { expect } from "chai";
import { activityData, userRepoInstance } from "./mockData/mock";

describe("Activity", () => {
  let activity;
  let current_user;
  let user2;

  beforeEach(() => {
    activity = activityData;
    current_user = userRepoInstance.users[0];
    user2 = userRepoInstance.users[1];
  });

  it("should take in activity data", () => {
    expect(activity.activityData).to.deep.equal(activityData.activityData);
  });

  it("should have a method that returns the miles a user has walked", () => {
    expect(activity.getMilesWalked(current_user, "2019/06/15")).to.equal(2.9);
  });

  it("should have a method that returns how many minutes the user were active by date", () => {
    expect(activity.getMinutesActive(current_user, "2019/06/15")).to.equal(140);
  });

  it("should have a method that returns how many minutes the user were active by date", () => {
    expect(activity.getMinutesActive(current_user, "2019/06/15")).to.equal(140);
  });

  it("should have a method that returns how many minutes the user were active for a week", () => {
    expect(
      activity.getMinutesActiveByWeek(current_user, "2019/06/15")
    ).to.deep.equal(121);
  });

  it("should have a method that returns if a user reached their step goal for a given day", () => {
    expect(activity.determineStepGoal(user2, "2019/06/15")).to.equal(true);
  });

  it("should have a method that returns if a user did not reach their step goal for a given day", () => {
    expect(activity.determineStepGoal(current_user, "2019/06/15")).to.equal(
      false
    );
  });

  it("should have a method that returns the dates a user reached their step goal", () => {
    activity.determineDaysGoalReached(user2);
    expect(activity.determineDaysGoalReached(user2)).to.deep.equal([
      "2019/06/15",
    ]);
  });

  //revisit during refactor
  it("should have a method that returns an empty array if the step goal isn't reached", () => {
    expect(activity.determineDaysGoalReached(current_user)).to.deep.equal([]);
  });

  it("should have a method that finds the user all time stair climbing record", () => {
    expect(activity.getAllTimeStairRecord(current_user)).to.equal(33);
  });

  it("should have a method that gets average stairs climb for all users on a specific date", () => {
    expect(activity.getEveryonesAverageStairsClimb("2019/06/15")).to.equal(24);
  });

  it("should have a method that gets average steps taken for all users on a specific date", () => {
    expect(activity.getEveryonesAverageStepsTaken("2019/06/15")).to.equal(4289);
  });

  it("should have a method that gets average minutes active for all users on a specific date", () => {
    expect(activity.getEveryonesAverageMinutesActive("2019/06/15")).to.equal(
      127
    );
  });
});
