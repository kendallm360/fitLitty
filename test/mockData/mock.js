import SleepRepository from "../../src/SleepRepository";
import HydrationRepository from "../../src/HydrationRepository";
import User from "../../src/User";
import UserRepository from "../../src/UserRepository";

const userRepoInstance = new UserRepository([
  {
    id: 1,
    name: "Luisa Hane",
    address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    email: "Diana.Hayes1@hotmail.com",
    strideLength: 4.3,
    dailyStepGoal: 10000,
    friends: [16, 4, 8],
  },
  {
    id: 2,
    name: "Jarvis Considine",
    address: "30086 Kathryn Port, Ciceroland NE 07273",
    email: "Dimitri.Bechtelar11@gmail.com",
    strideLength: 4.5,
    dailyStepGoal: 5000,
    friends: [9, 18, 24, 19],
  },
  {
    id: 3,
    name: "Herminia Witting",
    address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
    email: "Elwin.Tromp@yahoo.com",
    strideLength: 4.4,
    dailyStepGoal: 5000,
    friends: [19, 11, 42, 33],
  },
]);

const userHydrationData = [
  { userID: 1, date: "2019/06/14", numOunces: 96 },
  { userID: 1, date: "2019/06/15", numOunces: 37 },
  { userID: 1, date: "2019/06/16", numOunces: 69 },
  { userID: 1, date: "2019/06/17", numOunces: 96 },
  { userID: 1, date: "2019/06/18", numOunces: 69 },
  { userID: 1, date: "2019/06/19", numOunces: 96 },
  { userID: 1, date: "2019/06/20", numOunces: 69 },
  { userID: 1, date: "2019/06/21", numOunces: 96 },
  { userID: 1, date: "2019/06/22", numOunces: 96 },
];

const userSleepData = [
  { userID: 1, date: "2019/06/15", hoursSlept: 6.1, sleepQuality: 2.2 },
  { userID: 1, date: "2019/06/16", hoursSlept: 6.6, sleepQuality: 2 },
  { userID: 1, date: "2019/06/17", hoursSlept: 8.2, sleepQuality: 3 },
  { userID: 1, date: "2019/06/18", hoursSlept: 5.0, sleepQuality: 2.7 },
  { userID: 1, date: "2019/06/19", hoursSlept: 6.5, sleepQuality: 2.3 },
  { userID: 1, date: "2019/06/20", hoursSlept: 7.0, sleepQuality: 4 },
  { userID: 1, date: "2019/06/21", hoursSlept: 8.5, sleepQuality: 1.2 },
  { userID: 1, date: "2019/06/22", hoursSlept: 6.5, sleepQuality: 3.1 },
  { userID: 1, date: "2019/06/23", hoursSlept: 6.7, sleepQuality: 4.4 },
  { userID: 1, date: "2019/06/24", hoursSlept: 7.5, sleepQuality: 4.8 },
];

const weeklyHoursSlept = [
  { date: "2019/06/15", hoursSlept: 6 },
  { date: "2019/06/16", hoursSlept: 7 },
  { date: "2019/06/17", hoursSlept: 8 },
  { date: "2019/06/18", hoursSlept: 5 },
  { date: "2019/06/19", hoursSlept: 7 },
  { date: "2019/06/20", hoursSlept: 7 },
  { date: "2019/06/21", hoursSlept: 9 },
];

const weeklyWater = [
  { date: "2019/06/15", numOunces: 37 },
  { date: "2019/06/16", numOunces: 69 },
  { date: "2019/06/17", numOunces: 96 },
  { date: "2019/06/18", numOunces: 69 },
  { date: "2019/06/19", numOunces: 96 },
  { date: "2019/06/20", numOunces: 69 },
  { date: "2019/06/21", numOunces: 96 },
];

const userInstance1 = new User({
  id: 1,
  name: "Luisa Hane",
  address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
  email: "Diana.Hayes1@hotmail.com",
  strideLength: 4.3,
  dailyStepGoal: 10000,
  friends: [16, 4, 8],
});

const userInstance2 = new User({
  id: 2,
  name: "Jarvis Considine",
  address: "30086 Kathryn Port, Ciceroland NE 07273",
  email: "Dimitri.Bechtelar11@gmail.com",
  strideLength: 4.5,
  dailyStepGoal: 5000,
  friends: [9, 18, 24, 19],
});

const userInstance3 = new User({
  id: undefined,
  name: undefined,
  address: undefined,
  email: undefined,
  strideLength: undefined,
  dailyStepGoal: undefined,
  friends: undefined,
});

const sleepData = new SleepRepository([
  { userID: 1, date: "2019/06/15", hoursSlept: 6.1, sleepQuality: 2.2 },
  { userID: 1, date: "2019/06/16", hoursSlept: 6.6, sleepQuality: 2 },
  { userID: 1, date: "2019/06/17", hoursSlept: 8.2, sleepQuality: 3 },
  { userID: 1, date: "2019/06/18", hoursSlept: 5.0, sleepQuality: 2.7 },
  { userID: 1, date: "2019/06/19", hoursSlept: 6.5, sleepQuality: 2.3 },
  { userID: 2, date: "2019/06/19", hoursSlept: 6.1, sleepQuality: 2.4 },
  { userID: 1, date: "2019/06/20", hoursSlept: 7.0, sleepQuality: 4 },
  { userID: 1, date: "2019/06/21", hoursSlept: 8.5, sleepQuality: 1.2 },
  { userID: 1, date: "2019/06/22", hoursSlept: 6.5, sleepQuality: 3.1 },
  { userID: 1, date: "2019/06/23", hoursSlept: 6.7, sleepQuality: 4.4 },
  { userID: 1, date: "2019/06/24", hoursSlept: 7.5, sleepQuality: 4.8 },
]);

const hydrationData = new HydrationRepository([
  { userID: 1, date: "2019/06/14", numOunces: 96 },
  { userID: 1, date: "2019/06/15", numOunces: 37 },
  { userID: 2, date: "2019/06/15", numOunces: 75 },
  { userID: 1, date: "2019/06/16", numOunces: 69 },
  { userID: 1, date: "2019/06/17", numOunces: 96 },
  { userID: 1, date: "2019/06/18", numOunces: 69 },
  { userID: 1, date: "2019/06/19", numOunces: 96 },
  { userID: 1, date: "2019/06/20", numOunces: 69 },
  { userID: 1, date: "2019/06/21", numOunces: 96 },
  { userID: 1, date: "2019/06/22", numOunces: 96 },
]);

export {
  userRepoInstance,
  userHydrationData,
  userSleepData,
  weeklyHoursSlept,
  weeklyWater,
  userInstance1,
  userInstance2,
  userInstance3,
  sleepData,
  hydrationData,
};
