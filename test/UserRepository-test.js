import { expect } from "chai";
import UserRepository from "../src/UserRepository";
import { userRepoInstance } from "./mockData/mock";
describe("User Data", () => {
  let userRepo;
  // let testUsers;

  beforeEach(() => {
    // testUsers = [
    //   {
    //     id: 1,
    //     name: "Luisa Hane",
    //     address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    //     email: "Diana.Hayes1@hotmail.com",
    //     strideLength: 4.3,
    //     dailyStepGoal: 10000,
    //     friends: [16, 4, 8],
    //   },
    //   {
    //     id: 2,
    //     name: "Jarvis Considine",
    //     address: "30086 Kathryn Port, Ciceroland NE 07273",
    //     email: "Dimitri.Bechtelar11@gmail.com",
    //     strideLength: 4.5,
    //     dailyStepGoal: 5000,
    //     friends: [9, 18, 24, 19],
    //   },
    //   {
    //     id: 3,
    //     name: "Herminia Witting",
    //     address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
    //     email: "Elwin.Tromp@yahoo.com",
    //     strideLength: 4.4,
    //     dailyStepGoal: 5000,
    //     friends: [19, 11, 42, 33],
    //   },
    // ];
    userRepo = userRepoInstance;
  });

  it("should be a function", function () {
    expect(UserRepository).to.be.a("function");
  });

  it("Should be an instance of User", () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it("Should be able to take in multiple users", () => {
    expect(userRepo.users).to.be.a("array");
    expect(userRepo.users[0]).to.be.a("object");
    expect(userRepo.users).to.equal(userRepoInstance.users);
  });

  it("Should have a method that finds users by id", () => {
    expect(userRepo.findById(3)).to.equal(userRepoInstance.users[2]);
  });

  it("The method should return a message if id doesn't exist", () => {
    expect(userRepo.findById()).to.equal(
      "Oops it looks like no id was passed in"
    );
  });

  it("Should have a method that shows average step goals", () => {
    expect(userRepo.getAverageStepGoal()).to.equal(6667);
  });

  it("Should have a method that generates a random user", () => {
    expect(userRepo.generateRandomUser()).to.be.a("object");
  });
});
