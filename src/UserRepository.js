import { getAverage } from "./util.js";

export default class UserRepository {
  constructor(userData) {
    this.users = userData;
  }

  findById(id) {
    if (id === undefined) {
      return "Oops it looks like no id was passed in";
    } else {
      return this.users.find((user) => user.id === id);
    }
  }

  getAverageStepGoal() {
    return getAverage(this.users, "dailyStepGoal");
  }

  generateRandomUser() {
    return this.users[Math.floor(Math.random() * this.users.length)];
  }
}