class UserRepository {
  constructor(userData) {
    this.users = userData;
  }

  //   makeUserInstances(data) {
  //     array.data.map(function (data) {
  //         return new User(data);
  //       });
  //   }

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
