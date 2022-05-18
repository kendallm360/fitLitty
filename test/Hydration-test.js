import { expect } from "chai";
import Hydration from "../src/Hydration"

describe("Hydration", () => {
    let hydrationData1;
    let hydrationData2;
    let hydration1;
    let hydration2;

    beforeEach(() => {
        hydrationData1 = {
            "userID": 1,
            "date": "2019/06/16",
            "numOunces": 69
        }
        hydrationData2 = {
            "userID": 3,
            "date": "2019/06/16",
            "numOunces": 99
        }
        hydration1 = new Hydration(hydrationData1);
        hydration2 = new Hydration(hydrationData2);
    })

    it("should be a function", function () {
        expect(Hydration).to.be.a("function");
    });

    it("should be an instance of Hydration", () => {
        expect(hydration1).to.be.an.instanceOf(Hydration);
    });
    
    it("should take in a userID", () => {
        expect(hydration1.id).to.equal(1);
        expect(hydration2.id).to.equal(3);
    });
    
    it("should take in a date", () => {
        expect(hydration1.date).to.equal("2019/06/16")
    });

    it("should take in the number of ounces", () => {
        expect(hydration1.ounces).to.equal(69)
    });
    
    
})