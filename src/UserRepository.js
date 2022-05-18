class UserRepository {
  constructor(userData, hydrationData) {
    this.users = userData;
    this.hydrationData = hydrationData;
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAverageStepGoal() {
    let totalSteps = this.users.reduce((sum, user) => {
      sum += user.dailyStepGoal;
      return sum;
    }, 0);
    let average = totalSteps / this.users.length;
    return parseInt(average.toFixed());
  }

  getAverageFluidIntake(id) {
    const filteredHydration = this.hydrationData.filter(user => {
     return id === user.userID;
    })
    const totalHydration = filteredHydration.reduce((sum, user) => {
      sum += user.numOunces;
      return sum;
    }, 0)
    const avg = totalHydration / filteredHydration.length;
      return parseInt(avg.toFixed())
  }
}

export default UserRepository;
