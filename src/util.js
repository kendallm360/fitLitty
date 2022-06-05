//helper methods
const filterById = (id, arr) => {
  const filtered = arr.filter((obj) => id === obj.userID);
  return filtered;
};

const getAverage = (arr, attr) => {
  let total = arr.reduce((sum, obj) => {
    sum += obj[attr];
    return sum;
  }, 0);
  let average = total / arr.length;
  return parseInt(average.toFixed());
};

const getDataByDate = (arr, date, attr) => {
  const objByDate = arr.find((data) => data.date === date);
  if(objByDate){
    return Math.round(objByDate[attr]);
  }else{
    return 0;
  }
};

const getFilteredDataByDate = (arr, date) => {
  const arrayByDate = arr.filter((data) => data.date === date);
  return arrayByDate;
};

const getDataByWeek = (arr, dateSelected, attr) => {
  const index = arr.findIndex((data) => data.date === dateSelected);
  const week = arr.slice(index - 6, index + 1).map((data) => {
    return { date: data.date, [attr]: Math.round(data[attr]) };
  });
  return week;
};

export {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek,
  getFilteredDataByDate,
};
