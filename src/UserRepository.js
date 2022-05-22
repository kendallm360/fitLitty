import { getAverage } from "./util.js";

class UserRepository {
  constructor(userData) {
    this.users = userData;
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAverageStepGoal() {
    return getAverage(this.users, "dailyStepGoal");
  }
}

export default UserRepository;
