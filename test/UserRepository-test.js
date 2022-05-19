import { expect } from "chai";
import Hydration from "../src/Hydration";
import UserRepository from "../src/UserRepository";
import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek
} from '../src/util.js'

describe("User Data", () => {
  let userRepo;
  let testUsers;

  beforeEach(() => {
    testUsers = [
      {
        id: 1,
        name: "Luisa Hane",
        address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        email: "Diana.Hayes1@hotmail.com",
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [16, 4, 8],
      },
      {
        id: 2,
        name: "Jarvis Considine",
        address: "30086 Kathryn Port, Ciceroland NE 07273",
        email: "Dimitri.Bechtelar11@gmail.com",
        strideLength: 4.5,
        dailyStepGoal: 5000,
        friends: [9, 18, 24, 19],
      },
      {
        id: 3,
        name: "Herminia Witting",
        address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
        email: "Elwin.Tromp@yahoo.com",
        strideLength: 4.4,
        dailyStepGoal: 5000,
        friends: [19, 11, 42, 33],
      },
    ];
    userRepo = new UserRepository(testUsers);
  });

  it("should be a function", function () {
    expect(UserRepository).to.be.a("function");
  });

  it("Should be an instance of User", () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it("Should take in users", () => {
    expect(userRepo.users).to.equal(testUsers);
  });

  it("Should have a method that finds users by id", () => {
    expect(userRepo.findById(3)).to.equal(testUsers[2]);
  });

  it("Should have a method that shows average step goals", () => {
    expect(userRepo.getAverageStepGoal()).to.equal(6667);
  });
});

describe("Hydration Data", () => {
  let hydrationData;
  let userRepo;
  let testUsers;

  beforeEach(() => {
    testUsers = [
      {
        id: 1,
        name: "Luisa Hane",
        address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        email: "Diana.Hayes1@hotmail.com",
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [16, 4, 8],
      },
      {
        id: 2,
        name: "Jarvis Considine",
        address: "30086 Kathryn Port, Ciceroland NE 07273",
        email: "Dimitri.Bechtelar11@gmail.com",
        strideLength: 4.5,
        dailyStepGoal: 5000,
        friends: [9, 18, 24, 19],
      },
      {
        id: 3,
        name: "Herminia Witting",
        address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
        email: "Elwin.Tromp@yahoo.com",
        strideLength: 4.4,
        dailyStepGoal: 5000,
        friends: [19, 11, 42, 33],
      },
    ]
    hydrationData = [
      {"userID":1,"date":"2019/06/14","numOunces":96},
      {"userID":1,"date":"2019/06/15","numOunces":37},
      {"userID":2,"date":"2019/06/15","numOunces":75},
      {"userID":1,"date":"2019/06/16","numOunces":69},
      {"userID":1,"date":"2019/06/17","numOunces":96},
      {"userID":1,"date":"2019/06/18","numOunces":69},
      {"userID":1,"date":"2019/06/19","numOunces":96},
      {"userID":1,"date":"2019/06/20","numOunces":69},
      {"userID":1,"date":"2019/06/21","numOunces":96},
      {"userID":1,"date":"2019/06/22","numOunces":96}
    ]

    userRepo = new UserRepository(testUsers, hydrationData)


  })

  it("should take in hydrationData", () => {
    expect(userRepo.hydrationData).to.equal(hydrationData)
  })

  it("should average a users fluid intake", () => {
    expect(userRepo.getAverageFluidIntake(1)).to.equal(80)
  })

  it("should return a users fluid intake on given date", () => {
    expect(userRepo.getFluidIntakeByDate(1,"2019/06/16")).to.equal(69)
    expect(userRepo.getFluidIntakeByDate(2,"2019/06/15")).to.equal(75)
  })

  it("should show users fluid intake for each day of a given week", () => {
    expect(userRepo.getDailyFluidIntakeByWeek(1, "2019/06/21")).to.deep.equal([{date:"2019/06/15", fluidOz:37},
    {date:"2019/06/16", fluidOz:69},
    {date:"2019/06/17", fluidOz:96},
    {date:"2019/06/18", fluidOz:69},
    {date:"2019/06/19", fluidOz:96},
    {date:"2019/06/20", fluidOz:69},
    {date:"2019/06/21", fluidOz:96}])
  })
})
