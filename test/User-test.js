import { expect } from "chai";
import User from "../src/User";

describe("User", () => {
  let user1;
  let user2;
  let userData1;
  let userData2;

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
    user1 = new User(userData1);
    user2 = new User(userData2);
  });

  it("Should be a function", () => {
    expect(User).to.be.a("function");
  });

  it("Should be an instance of User", () => {
    expect(user1).to.be.an.instanceOf(User);
  });
});
