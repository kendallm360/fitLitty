import { expect } from "chai";
import { activityData } from "./mockData/mock";

describe("Activity", () => {
  let activity;

  beforeEach(() => {
    activity = activityData;
  });

  it("should take in activity data", () => {
    expect(activity.activityData).to.deep.equal(activityData.activityData);
  });

  it.only("should have a method that returns the miles a user has walked", () => {
    // activity.getMilesWalked(1, 4, "2019/06/15");
    expect(activity.getMilesWalked(1, 4, "2019/06/15")).to.equal(2.7);
  });
});
