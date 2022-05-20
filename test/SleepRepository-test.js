import { expect } from "chai";
import SleepRepository from "../src/SleepRepository";
import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek
} from '../src/util.js'


describe("Sleep Data", () => {
    let userRepo;
    let sleepData;
  
    beforeEach(() => {
      
  
      sleepData = [
        {"userID":1,"date":"2019/06/15","hoursSlept":6.1,"sleepQuality":2.2},
        {"userID":1,"date":"2019/06/16","hoursSlept":6.6,"sleepQuality":2},
        {"userID":1,"date":"2019/06/17","hoursSlept":8.2,"sleepQuality":3},
        {"userID":1,"date":"2019/06/18","hoursSlept":5.0,"sleepQuality":2.7},
        {"userID":1,"date":"2019/06/19","hoursSlept":6.5,"sleepQuality":2.3},
        {"userID":2,"date":"2019/06/19","hoursSlept":6.1,"sleepQuality":2.4},
        {"userID":1,"date":"2019/06/20","hoursSlept":7.0,"sleepQuality":4},
        {"userID":1,"date":"2019/06/21","hoursSlept":8.5,"sleepQuality":1.2},
        {"userID":1,"date":"2019/06/22","hoursSlept":6.5,"sleepQuality":3.1},
        {"userID":1,"date":"2019/06/23","hoursSlept":6.7,"sleepQuality":4.4},
        {"userID":1,"date":"2019/06/24","hoursSlept":7.5,"sleepQuality":4.8}
      ]
  
      userRepo = new SleepRepository(sleepData)
  
      })
  
      it("should show average of hours slept per day for a user", () => {
        expect(userRepo.getAverageSleep(1)).to.equal(7)
      });
  
      it("should show average sleep quality per day", () => {
        expect(userRepo.getAverageSleepQuality(1)).to.equal(3)
      });
  
      it("should show how many hours user slept for specific day", () => {
        expect(userRepo.getSleepByDate(1,"2019/06/17")).to.equal(8.2)
      });
  
      it("should show sleep quality for a user on a specific day", () => {
        expect(userRepo.getQualityByDate(1,"2019/06/17")).to.equal(3)
      });
  
      it("should show user hours of sleep for each day over given week", () => {
        expect(userRepo.getSleepByWeek(1,"2019/06/21")).to.deep.equal(
          [
            {date:"2019/06/15", hoursSlept:6},
            {date:"2019/06/16", hoursSlept:7},
            {date:"2019/06/17", hoursSlept:8},
            {date:"2019/06/18", hoursSlept:5},
            {date:"2019/06/19", hoursSlept:7},
            {date:"2019/06/20", hoursSlept:7},
            {date:"2019/06/21", hoursSlept:9}
          ]
        )
      });
  
      it("should show user sleep quality each day over give week", () => {
        expect(userRepo.getQualityByWeek(1,"2019/06/21")).to.deep.equal(
          [
            {date:"2019/06/15", sleepQuality:2},
            {date:"2019/06/16", sleepQuality:2},
            {date:"2019/06/17", sleepQuality:3},
            {date:"2019/06/18", sleepQuality:3},
            {date:"2019/06/19", sleepQuality:2},
            {date:"2019/06/20", sleepQuality:4},
            {date:"2019/06/21", sleepQuality:1}
          ]
        )
      });
  
      it("should return average sleep quality for all users", () => {
        expect(userRepo.getAverageSleepQualityAll()).to.equal(3)
      })
    });