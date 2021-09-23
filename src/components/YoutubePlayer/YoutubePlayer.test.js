import { getIndex } from "./setDragSelect";
import { getTimeStamp } from "./setScript";

describe("setScript", () => {
  it("getTimeStamp", () => {
    // given
    const sentence = {
      begin: 31.9,
      end: 44.3,
      sentence: "play time",
    };

    // when
    const result = getTimeStamp(sentence);

    // then
    expect(result).toBe("0:31");
  });
});

describe("setDragSelect", () => {
  it("getIndex", () => {
    // given
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    li1.id = "idx2";
    li2.id = "idx3";
    const selectedElements = [li1, li2];

    // when
    const result = getIndex(selectedElements);

    // then
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(3);
  });
});
