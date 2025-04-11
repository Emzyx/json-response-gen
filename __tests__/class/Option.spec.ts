import { ALPHA, NUMERIC, Option, SELECTION_TYPES } from "../../src";

describe("Option", () => {
  it("simple value test", () => {
    const option = new Option([true, false], {
      selectionType: SELECTION_TYPES.IN_ORDER,
    });
    const item = option.build({});
    expect(option.test(item)).toEqual(true);
  });
  it("regex test", () => {
    const option = new Option([NUMERIC(10), ALPHA(10)], {
      selectionType: SELECTION_TYPES.IN_ORDER,
    });
    const item = option.build({});
    expect(option.test(item)).toEqual(true);
  });
  it("in order getting items", () => {
    const optionArr = [NUMERIC(10), ALPHA(10), 123456];
    const option = new Option(optionArr);
    let flag = true;
    for (let i = 0; i < 10; i++) {
      const trueIdx = i % optionArr.length;
      const item = option.build({});
      const result = option.test(item);
      if (!result) flag = false;
    }
    expect(flag).toEqual(true);
  });
});
