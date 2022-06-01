import { expect } from "chai";
import { activityData, userRepoInstance } from "./mockData/mock";

describe("Activity", () => {
  let activity;

  beforeEach(() => {
    activity = activityData;
  });

  it("should take in activity data", () => {
    expect(activity.activityData).to.deep.equal(activityData.activityData);
  });

  it.only("should have a method that returns the miles a user has walked", () => {
    let current_user = userRepoInstance.users[0]
    expect(activity.getMilesWalked(current_user, "2019/06/15")).to.equal(2.9);
  });
});
