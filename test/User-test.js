import { expect } from "chai";
import User from "../src/User";

describe("User", () => {
  let user1;
  let user2;
  let user3;
  let userData1;
  let userData2;
  let userData3;

  beforeEach(() => {
    userData1 = {
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    };

    userData2 = {
      id: 2,
      name: "Jarvis Considine",
      address: "30086 Kathryn Port, Ciceroland NE 07273",
      email: "Dimitri.Bechtelar11@gmail.com",
      strideLength: 4.5,
      dailyStepGoal: 5000,
      friends: [9, 18, 24, 19],
    };
    userData3 = {
      id: undefined,
      name: undefined,
      address: undefined,
      email: undefined,
      strideLength: undefined,
      dailyStepGoal: undefined,
      friends: undefined,
    };
    user1 = new User(userData1);
    user2 = new User(userData2);
    user3 = new User(userData3);
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

  // it("Should throw an error if no id is available", () => {
  //   expect(user3.id).to.equal(?);
  // });

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
