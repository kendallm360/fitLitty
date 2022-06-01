class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  returnFirstName() {
    if (this.name === undefined) {
      return "Oops it looks like your name is missing from our data base";
    } else {
      return this.name.split(" ")[0];
    }
  }
}

export default User;
