import { getIndex } from "./setDragSelect";
import { getTimeStamp } from "./setScript";
import { getSecondsFromTime } from "./YoutubePlayer";

describe("YoutubePlayer", () => {
  it("getSecondsFromTime", () => {
    // given
    const time1 = "1:23:45.56";
    const time2 = "0:23:45.56";
    const time3 = "0:03:45.56";

    // when
    const result1 = getSecondsFromTime(time1);
    const result2 = getSecondsFromTime(time2);
    const result3 = getSecondsFromTime(time3);

    // then
    expect(result1).toBe(5025.56);
    expect(result2).toBe(1425.56);
    expect(result3).toBe(225.56);
  });
});

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
