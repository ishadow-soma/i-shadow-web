import { getIndex } from "./setDragSelect";
import { getTimeStamp } from "./setScript";
import { getTitle } from "global/player/setPlayer";
import { _getSecondsFromTime } from "global/player/setPlayer";

describe("YoutubePlayer", () => {
  it("getSecondsFromTime", () => {
    // given
    const time1 = "1:23:45.56";
    const time2 = "0:23:45.56";
    const time3 = "0:03:45.56";

    // when
    const result1 = _getSecondsFromTime(time1);
    const result2 = _getSecondsFromTime(time2);
    const result3 = _getSecondsFromTime(time3);

    // then
    expect(result1).toBe(5025.56);
    expect(result2).toBe(1425.56);
    expect(result3).toBe(225.56);
  });

  it("getTitle skip", () => {
    // given
    const title = "12345678901234567890123456789012345678901234567890123";

    // when
    const result = getTitle(title);

    // then
    expect(result).toBe(
      "12345678901234567890123456789012345678901234567890..."
    );
  });

  it("getTitle no skip", () => {
    // given
    const title = "1234567890";

    // when
    const result = getTitle(title);

    // then
    expect(result).toBe("1234567890");
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
