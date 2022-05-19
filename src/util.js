//helper methods
//this.filterById(id, "hydrationData");
  function filterById(id, arr) {
    // attr = "hydrationData" || "sleepData" || "activityData"
    const filtered = arr.filter(obj => {
      return id === obj.userID;
    })
    return filtered;
  }
//this.getAverage(filteredHydration, "numOunces")
  function getAverage(arr, attr) {
    let total = arr.reduce((sum, obj) => {
      sum += obj[attr];
      return sum;
    }, 0);
    let average = total / arr.length;
    return parseInt(average.toFixed());
  }
//this.getDataByDate(filteredHydration, date, "numOunces")
  function getDataByDate(arr, date, attr) {
    const objByDate = arr.find(data => {
      return data.date === date;
    })
    return objByDate[attr];
  }
//this.getDataByWeek(filteredHydration, dateSelected, "fluidOz", "numOunces")
  function getDataByWeek(arr, dateSelected, key, attr){
    const index = arr.findIndex(data => {
      return data.date === dateSelected
    })
    const week = arr.slice((index - 6) , (index + 1))
      .map(data => {
        return {date: data.date, [key]: Math.round(data[attr])}
      })
      return week;
  }

  export {
    filterById,
    getAverage,
    getDataByDate,
    getDataByWeek
  }
