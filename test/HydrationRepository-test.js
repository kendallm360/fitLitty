import { expect } from "chai";
import HydrationRepository from "../src/HydrationRepository";
import {
  filterById,
  getAverage,
  getDataByDate,
  getDataByWeek
} from '../src/util.js'


describe("Hydration Data", () => {
    let hydrationData;
    let userRepo;
  
    beforeEach(() => {
      hydrationData = [
        {"userID":1,"date":"2019/06/14","numOunces":96},
        {"userID":1,"date":"2019/06/15","numOunces":37},
        {"userID":2,"date":"2019/06/15","numOunces":75},
        {"userID":1,"date":"2019/06/16","numOunces":69},
        {"userID":1,"date":"2019/06/17","numOunces":96},
        {"userID":1,"date":"2019/06/18","numOunces":69},
        {"userID":1,"date":"2019/06/19","numOunces":96},
        {"userID":1,"date":"2019/06/20","numOunces":69},
        {"userID":1,"date":"2019/06/21","numOunces":96},
        {"userID":1,"date":"2019/06/22","numOunces":96}
      ]
  
      userRepo = new HydrationRepository(hydrationData)
  
  
    })
  
    it("should take in hydrationData", () => {
      expect(userRepo.hydrationData).to.equal(hydrationData)
    })
  
    it("should average a users fluid intake", () => {
      expect(userRepo.getAverageFluidIntake(1)).to.equal(80)
    })
  
    it("should return a users fluid intake on given date", () => {
      expect(userRepo.getFluidIntakeByDate(1,"2019/06/16")).to.equal(69)
      expect(userRepo.getFluidIntakeByDate(2,"2019/06/15")).to.equal(75)
    })
  
    it("should show users fluid intake for each day of a given week", () => {
      expect(userRepo.getDailyFluidIntakeByWeek(1, "2019/06/21")).to.deep.equal(
      [{date:"2019/06/15", fluidOz:37},
      {date:"2019/06/16", fluidOz:69},
      {date:"2019/06/17", fluidOz:96},
      {date:"2019/06/18", fluidOz:69},
      {date:"2019/06/19", fluidOz:96},
      {date:"2019/06/20", fluidOz:69},
      {date:"2019/06/21", fluidOz:96}])
    })
  });