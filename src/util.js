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
  return Math.round(objByDate[attr]);
};

const getDataByWeek = (arr, dateSelected, attr) => {
  const index = arr.findIndex((data) => data.date === dateSelected);
  const week = arr.slice(index - 6, index + 1).map((data) => {
    return { date: data.date, [attr]: Math.round(data[attr]) };
  });
  return week;
};

export { filterById, getAverage, getDataByDate, getDataByWeek };
