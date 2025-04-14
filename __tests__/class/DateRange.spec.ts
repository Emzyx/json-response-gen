import { DateRange } from "../../src";

describe("DateRange", () => {
  it("within current date test", () => {
    const dateBuilder = new DateRange(10);
    const date = dateBuilder.build({});
    expect(dateBuilder.test(date)).toEqual(true);
  });
  it("within window test", () => {
    const dateBuilder = new DateRange(10, false);
    const date = dateBuilder.build({});
    expect(dateBuilder.test(date)).toEqual(true);
  });
});
