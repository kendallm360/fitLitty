class UserRepository {
  constructor(userData, hydrationData) {
    this.users = userData;
    this.hydrationData = hydrationData;
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAverageStepGoal() {
    let average = this.users.reduce((sum, user) => {
      sum += user.dailyStepGoal;
      return sum;
    }, 0);
    let test = average / this.users.length;
    return parseInt(test.toFixed());
  }
}

export default UserRepository;
