import {
    filterById,
    getAverage,
    getDataByDate,
    getDataByWeek
  } from './util.js'

  class HydrationRepository {
      constructor(hydrationData){
        this.hydrationData = hydrationData;
      }

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
        return getDataByWeek(filteredHydration, dateSelected, "numOunces")
      };
  }

  export default HydrationRepository;