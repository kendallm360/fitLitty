import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek
} from './util.js'

class UserRepository {
  constructor(userData, hydrationData, sleepData) {
    this.users = userData;
    this.hydrationData = hydrationData;
    this.sleepData = sleepData;
  }

//User methods
  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  getAverageStepGoal() {
    return getAverage(this.users, "dailyStepGoal")
  }

//hydration methods
  // getFilteredHydration(id){
  //   return this.filterById(id, "hydrationData");
  // }

  getAverageFluidIntake(id) {
    let filteredHydration = filterById(id, this.hydrationData)
    return getAverage(filteredHydration, "numOunces")
  };

   getFluidIntakeByDate(id, date){
     let filteredHydration = filterById(id, this.hydrationData)
     return getDataByDate(filteredHydration, date, "numOunces")
   };

  getDailyFluidIntakeByWeek(id, dateSelected){
    let filteredHydration = filterById(id, this.hydrationData)
    return getDataByWeek(filteredHydration, dateSelected, "fluidOz", "numOunces")
  };

//sleep methods
  getAverageSleep(id){
  let filteredSleep = filterById(id, this.sleepData)
    return getAverage(filteredSleep, "hoursSlept")
  };

}

export default UserRepository;
