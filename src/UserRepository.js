class UserRepository {
  constructor(userData, hydrationData) {
    this.users = userData;
    this.hydrationData = hydrationData;
  }

//helper methods
//this.filterById(id, "hydrationData");
  filterById(id, attr) {
    // attr = "hydrationData" || "sleepData" || "activityData"
    const filtered = this[attr].filter(obj => {
      return id === obj.userID;
    })
    return filtered;
  }
//this.getAverage(filteredHydration, "numOunces")
  getAverage(arr, attr) {
    let total = arr.reduce((sum, obj) => {
      sum += obj[attr];
      return sum;
    }, 0);
    let average = total / arr.length;
    return parseInt(average.toFixed());
  }
//this.getDataByDate(filteredFluidById, date, "numOunces")
  getDataByDate(arr, date, attr) {
    const objByDate = arr.find(data => {
      return data.date === date;
    })
    return objByDate[attr];
  }
//this.getDataByWeek(filteredFluidById, dateSelected, "fluidOz", "numOunces")
  getDataByWeek(arr, dateSelected, key, attr){
    const index = arr.findIndex(data => {
      return data.date === dateSelected
    })
    const week = arr.slice((index - 6) , (index + 1))
      .map(data => {
        return {date: data.date, [key]: data[attr]}
      })
    return week;
  }

//User methods
  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAverageStepGoal() {
    return this.getAverage(this.users, "dailyStepGoal")
  }

//hydration methods
  getAverageFluidIntake(id) {
    const filteredHydration = this.filterById(id, "hydrationData");
    return this.getAverage(filteredHydration, "numOunces")
  }

   getFluidIntakeByDate(id, date){
     const filteredFluidById = this.filterById(id, "hydrationData");
     return this.getDataByDate(filteredFluidById, date, "numOunces")
   }

  getDailyFluidIntakeByWeek(id, dateSelected){
    const filteredFluidById = this.filterById(id, "hydrationData");
    return this.getDataByWeek(filteredFluidById, dateSelected, "fluidOz", "numOunces")
  }

//sleep methods
}

export default UserRepository;
