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

  filterById(id) {
    const filtered = this.hydrationData.filter(user => {
      return id === user.userID;
     })
     return filtered;
  }

  getAverageFluidIntake(id) {
    const filteredHydration = this.filterById(id);
    const totalHydration = filteredHydration.reduce((sum, user) => {
      sum += user.numOunces;
      return sum;
    }, 0)
    const avg = totalHydration / filteredHydration.length;
    return parseInt(avg.toFixed())
  }

   getFluidIntakeByDate(id, date){
     const filteredFluidById = this.filterById(id);
     const fluidByDate = filteredFluidById.find(data => {
      return data.date === date;
     })
     return fluidByDate.numOunces;
   }

  getDailyFluidIntakeByWeek(id, dateSelected){
    const filteredFluidById = this.filterById(id);
    const index = filteredFluidById.findIndex(data => {
      return data.date === dateSelected
    })
    
    const week = filteredFluidById.slice((index - 6) , (index + 1))
      .map(data => {
        return data.numOunces
      })
    return week;
   }
}

export default UserRepository;
