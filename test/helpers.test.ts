import { expect } from "chai";
import { set } from "./helpers";

describe("Helpers functions", () => {
  describe("st", () => {
    it("should return passed object if it is not an object", () => {
      const anobject = 3;
      const result = set(anobject, "test.test", 3);
      expect(result).to.equal(anobject);
    });

    it("should return passed null if null is passed as first argument", () => {
      const anobject: unknown = null;

      const result = set(anobject, "test.test", 3);

      expect(result).to.equal(anobject);
    });

    it("should throw an error if path os not a string", () => {
      const anobject = {};

      const path = 3 as any;

      const fn = () => set(anobject, path, 3);

      expect(fn).to.throw(Error);
    });

    describe("beforeEach", () => {
      let oneObject: object, path: string, value: number;
      beforeEach(() => {
        oneObject = {};
        path = "a.b.c";
        value = 3;
      });

      it("should set new property to passed object with passed value", () => {
        const result = set(oneObject, path, value);
        expect((result as any).a.b.c).to.eq(value);
      });

      it("should not return new object", () => {
        const result = set(oneObject, path, value);
        expect(result).to.eq(oneObject);
      });
    });
  });
});
