import { expect } from "chai";
import { hydrationData } from "./mockData/mock";

describe("Hydration Data", () => {
  let userRepo;

  beforeEach(() => {
    userRepo = hydrationData;
  });

  it("should take in hydrationData", () => {
    expect(userRepo.hydrationData).to.equal(hydrationData.hydrationData);
  });

  it("should average a users fluid intake", () => {
    expect(userRepo.getAverageFluidIntake(1)).to.equal(80);
  });

  it("should return a users fluid intake on given date", () => {
    expect(userRepo.getFluidIntakeByDate(1, "2019/06/16")).to.equal(69);
    expect(userRepo.getFluidIntakeByDate(2, "2019/06/15")).to.equal(75);
  });

  it("should show users fluid intake for each day of a given week", () => {
    expect(userRepo.getDailyFluidIntakeByWeek(1, "2019/06/21")).to.deep.equal([
      { date: "2019/06/15", numOunces: 37 },
      { date: "2019/06/16", numOunces: 69 },
      { date: "2019/06/17", numOunces: 96 },
      { date: "2019/06/18", numOunces: 69 },
      { date: "2019/06/19", numOunces: 96 },
      { date: "2019/06/20", numOunces: 69 },
      { date: "2019/06/21", numOunces: 96 },
    ]);
  });
});
