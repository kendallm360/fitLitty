import { expect } from "chai";
import { activityData, userRepoInstance } from "./mockData/mock";

describe("Activity", () => {
  let activity;
  let current_user;
  let user2;

  beforeEach(() => {
    activity = activityData;
    current_user = userRepoInstance.findById(1);
    user2 = userRepoInstance.findById(2)
  });

  it("should take in activity data", () => {
    expect(activity.activityData).to.deep.equal(activityData.activityData);
  });

  it("should have a method that returns the steps a user has walked on given date", () => {
    expect(activity.getSteps(current_user, "2019/06/15")).to.equal(3577);
    expect(activity.getSteps(user2, "2019/06/15")).to.equal(5001)
  });

  it("should have a method that returns the flights a user has climbed on given date", () => {
    expect(activity.getFlightsClimbed(current_user, "2019/06/15")).to.equal(16);
    expect(activity.getFlightsClimbed(user2, "2019/06/15")).to.equal(32)
  });

  it("should have a method that returns the miles a user has walked", () => {
    expect(activity.getMilesWalked(current_user, "2019/06/15")).to.equal(2.9);
    expect(activity.getMilesWalked(user2, "2019/06/15")).to.equal(4.3);
  });

  it("should have a method that returns how many minutes the user were active by date", () => {
    expect(activity.getMinutesActive(current_user, "2019/06/15")).to.equal(140);
    expect(activity.getMinutesActive(user2, "2019/06/15")).to.equal(114);
  });

 it("should have a method that returns how many minutes the user were active for each day of a given week", () => {
    expect(
      activity.getMinutesActiveByWeek(current_user, "2019/06/15")
    ).to.deep.equal([
      {
        date: "2019/06/09",
        minutesActive: 114,
      },
      {
        date: "2019/06/10",
        minutesActive: 114,
      },
      {
        date: "2019/06/11",
        minutesActive: 114,
      },
      {
        date: "2019/06/12",
        minutesActive: 114,
      },
      {
        date: "2019/06/13",
        minutesActive: 116,
      },
      {
        date: "2019/06/14",
        minutesActive: 138,
      },
      {
        date: "2019/06/15",
        minutesActive: 140,
      }
    ]);
  });

  it("should have a method that returns how many steps the user has taken for each day of a given week", () => {
    expect(
      activity.getStepsByWeek(current_user, "2019/06/15")
    ).to.deep.equal( [
      {
        date: "2019/06/09",
       numSteps: 3486
      },
      {
        date: "2019/06/10",
       numSteps: 3486
      },
      {
        date: "2019/06/11",
      numSteps: 3486
      },
      {
        date: "2019/06/12",
      numSteps: 3486
      },
      {
        date: "2019/06/13",
       numSteps: 7402
      },
      {
        date: "2019/06/14",
       numSteps: 4294
      },
      {
        date: "2019/06/15",
       numSteps: 3577
      }
    ]);
  });

  it("should have a method that returns how many flights the user has climbed for each day of a given week", () => {
    expect(
      activity.getFlightsByWeek(current_user, "2019/06/15")
    ).to.deep.equal([
      {
        date: "2019/06/09",
      flightsOfStairs: 32
      }, 
      {
        date: "2019/06/10",
      flightsOfStairs: 32
      },
      {
        date: "2019/06/11",
      flightsOfStairs: 32
      },
      {
        date: "2019/06/12",
      flightsOfStairs: 32
      }, 
      {
        date: "2019/06/13",
      flightsOfStairs: 33
      },
      {
        date: "2019/06/14",
      flightsOfStairs: 10
      },
      {
        date: "2019/06/15",
      flightsOfStairs: 16
      }
    ]);
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
