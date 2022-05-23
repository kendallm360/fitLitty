import {
    filterById,
    getAverage,
    getDataByDate,
    getDataByWeek
  } from './util.js'

  class SleepRepository {
      constructor(sleepData){
        this.sleepData = sleepData;
      }

      getAverageSleep(id){
        let filteredSleep = filterById(id, this.sleepData)
          return getAverage(filteredSleep, "hoursSlept")
        };
      
        getAverageSleepQuality(id) {
          let filteredSleep = filterById(id, this.sleepData)
            return getAverage(filteredSleep, "sleepQuality")
        };
      
        getSleepByDate(id, date) {
          let filteredSleep = filterById(id, this.sleepData)
            return getDataByDate(filteredSleep, date, "hoursSlept")
        };
      
        getQualityByDate(id, date) {
          let filteredSleep = filterById(id, this.sleepData);
            return getDataByDate(filteredSleep, date, "sleepQuality")
        };
      
        getSleepByWeek(id, date) {
          let filteredSleep = filterById(id, this.sleepData);
          return getDataByWeek(filteredSleep, date, "hoursSlept")
        };
      
        getQualityByWeek(id, date) {
          let filteredSleep = filterById(id, this.sleepData);
          return getDataByWeek(filteredSleep, date, "sleepQuality")
        };
      
        getAverageSleepQualityAll(){
          return getAverage(this.sleepData, "sleepQuality");
        }
  }

  export default SleepRepository;