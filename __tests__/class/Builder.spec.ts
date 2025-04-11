import { Builder, DateRange } from "../../src";
import {
  COMPLEX_OBJECT,
  MODERATELY_COMPLEX_ARRAY,
  MODERATELY_COMPLEX_ARRAY_SUPP,
  MODERATELY_COMPLEX_ARRAY_SUPP_INVALID_PATH,
  MODERATELY_COMPLEX_ARRAY_SUPP_SIMPLE_NESTED_SHAPE,
  PARALLEL_NESTED_ARRAY,
  PARALLEL_NESTED_ARRAY_SUPP,
  SIMPLE,
  SIMPLE_SUPP_INVALID_PATH,
  SIMPLE_SUPP_SIMPLE_ARR,
} from "../__utils__";

jest.mock("fs");

describe("Builder", () => {
  it("empty shape", () => {
    const empty = new Builder().build({}, "test.json").getResult();
    expect(empty).toEqual({});
  });
  it("generate object", () => {
    const result = new Builder().build(COMPLEX_OBJECT).getResult();
    expect(Object.keys(<Object>result).length).toEqual(3);
  });

  it("test map interactions", () => {
    const builder = new Builder();
    builder.addSharedValue("k", "v");
    const val = builder.getSharedValue("k");
    expect(val).toEqual("v");
  });

  it("test result interactions", () => {
    const builder = new Builder();
    const arr = [{ mock: "mock" }];
    builder.addResult(arr);
    const val = builder.getResult();
    expect(val).toEqual(arr);
    const resultsArr = builder.getResults();
    expect(resultsArr.length).toEqual(1);
  });

  it("should generate two objects to shared", () => {
    const builder = new Builder();
    builder.build(MODERATELY_COMPLEX_ARRAY);
    expect(builder.getResults().length).toEqual(1);

    builder.build(MODERATELY_COMPLEX_ARRAY_SUPP);
    expect(builder.getResults().length).toEqual(2);

    const res1 = <any[]>builder.getResult(0);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    let pass = true;
    expect(res1.length).toEqual(res2.users.length);
    for (let i = 0; i < res1.length; i++) {
      if (res1[i].identifier !== res2.users[i].identifier) pass = false;
      for (let j = 0; j < res1[i].accounts.length; j++) {
        if (
          res1[i].accounts[j].token !==
          res2.users[i].accountInformation[j].accountToken
        ) {
          pass = false;
        }
      }
    }
    expect(pass).toEqual(true);
  });

  it("should generate two objects with shared values, and correct shared from relative arrays", () => {
    const builder = new Builder();
    builder.build(PARALLEL_NESTED_ARRAY);
    expect(builder.getResults().length).toEqual(1);
    builder.build(PARALLEL_NESTED_ARRAY_SUPP);
    expect(builder.getResults().length).toEqual(2);
    const res1 = <{ [key: string]: any }>builder.getResult(0);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    let pass = true;
    expect(res1.userBase.length).toEqual(res2.allAccounts.length);
    for (let i = 0; i < res1.userBase.length; i++) {
      if (!Array.isArray(res2.allAccounts[i])) pass = false;
    }
    for (let i = 0; i < res1.notes.length; i++) {
      if (!Array.isArray(res2.allTags[i])) pass = false;
      if (res1.notes[i].tags.length !== res2.allTags[i].length) pass = false;
    }
    expect(pass).toEqual(true);
  });

  it("should return empty arrs for invalid path", () => {
    const builder = new Builder();
    builder.build(SIMPLE);
    builder.build(SIMPLE_SUPP_INVALID_PATH);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    expect(res2.array2).toEqual([]);
  });

  it("should return empty arrs for invalid path in nested", () => {
    const builder = new Builder();
    builder.build(MODERATELY_COMPLEX_ARRAY);
    builder.build(MODERATELY_COMPLEX_ARRAY_SUPP_INVALID_PATH);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    expect(res2.users[0].accountInformation).toEqual([]);
  });

  it("should return generation when nested shape resolves to a non object", () => {
    const builder = new Builder();
    builder.build(MODERATELY_COMPLEX_ARRAY);
    builder.build(MODERATELY_COMPLEX_ARRAY_SUPP_SIMPLE_NESTED_SHAPE);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    const dateRange = new DateRange(10);
    expect(dateRange.test(res2.users[0].accountInformation[0])).toEqual(true);
  });

  it("should return copy when given path resolves to an array of non iterables", () => {
    const builder = new Builder();
    builder.build(SIMPLE);
    builder.build(SIMPLE_SUPP_SIMPLE_ARR);
    const res2 = <{ [key: string]: any }>builder.getResult(1);
    const dateRange = new DateRange(10);
    expect(dateRange.test(res2.array2[0])).toEqual(true);
  });
});
