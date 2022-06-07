import { expect } from "chai";
import UserRepository from "../src/UserRepository";
import { userRepoInstance } from "./mockData/mock";
describe("User Data", () => {
  let userRepo;

  beforeEach(() => {
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
