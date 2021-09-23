import { getIndex } from "./setDragSelect";

describe("DragSelect", () => {
  it("getIndex", () => {
    // given
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    li1.id = "idx2";
    li2.id = "idx3";
    const selectedElements = [li1, li2];
    const result = getIndex(selectedElements);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(3);
  });
});
