import { expect } from "chai";
import User from "../src/User";
import { userInstance1, userInstance2, userInstance3 } from "./mockData/mock";

describe("User", () => {
  let user1;
  let user2;
  let user3;

  beforeEach(() => {
    user1 = userInstance1;
    user2 = userInstance2;
    user3 = userInstance3;
  });

  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("Should be an instance of User", () => {
    expect(user1).to.be.an.instanceOf(User);
  });

  it("Should take in user's id", () => {
    expect(user1.id).to.equal(1);
  });

  it("Should take in user's name", () => {
    expect(user1.name).to.equal("Luisa Hane");
  });

  it("Should take in user's address", () => {
    expect(user1.address).to.equal(
      "15195 Nakia Tunnel, Erdmanport VA 19901-1697"
    );
  });

  it("Should take in user's email", () => {
    expect(user1.email).to.equal("Diana.Hayes1@hotmail.com");
  });

  it("Should take in user's stride length", () => {
    expect(user1.strideLength).to.equal(4.3);
  });

  it("Should take in user's daily step goals", () => {
    expect(user1.dailyStepGoal).to.equal(10000);
  });

  it("Should take in user's friends", () => {
    expect(user1.friends).to.deep.equal([16, 4, 8]);
  });

  it("Should have a method that returns the user's first name", () => {
    expect(user1.returnFirstName()).to.equal("Luisa");
  });

  it("The method should return a message if a name is missing", () => {
    expect(user3.returnFirstName()).to.equal(
      "Oops it looks like your name is missing from our data base"
    );
  });
});
