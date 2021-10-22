import DragSelect from "dragselect";
import logOnlyDevelopment from "global/log/log";
import { repeatStore } from "global/store/store";
import Bookmark from "global/Bookmark/Bookmark";

export default function setDragSelect(player, script) {
  let dsSelected = null;
  const bookmarkApi = new Bookmark();
  const sections = [];
  let ds = new DragSelect({
    selectables: document.querySelectorAll(".item"),
    area: document.getElementsByClassName("content")[0],
    draggability: false,
    callback: (e) => {
      logOnlyDevelopment("callback!");

      const selectedElements = document.getElementsByClassName("ds-selected");
      sections.push({
        begin: getIndex(selectedElements),
        end: getIndex(selectedElements),
      });

      createNewButtons();
    },
  });

  function createNewButtons() {
    const selectedElements = document.getElementsByClassName("ds-selected");
    if (validateElements(selectedElements)) {
      const repetitionIcon = createRepetitionIcon();
      const lastElement = selectedElements[selectedElements.length - 1];
      lastElement.append(repetitionIcon);
    }
  }

  function validateElements(selectedElements) {
    return selectedElements.length > 0;
  }

  function removeButtons() {
    const repetitionIcons = document.getElementsByClassName("repetition");
    const bookmarkIcons = document.getElementsByClassName("bookmark-icon");
    if (repetitionIcons.length > 0) {
      repetitionIcons[0].remove();
      bookmarkIcons[0].remove();
    }
  }

  let repetition = null;
  let originBegin;
  let originEnd;
  let setTime;
  const createRepetitionIcon = () => {
    const result = document.createElement("i");
    result.className = "repetition xi-repeat";
    result.onclick = () => {
      restore();
      repeat();
    };

    const selectedElements = document.getElementsByClassName("ds-selected");
    const [beginIndex, endIndex] = getIndex(selectedElements);
    setTime = setTimeout(() => {
      originBegin = beginIndex;
      originEnd = endIndex;
    }, 40);

    return result;
  };

  function restore() {
    ds.clearSelection();
    for (
      let i = sections[sections.length - 2][0];
      i < sections[sections.length - 2][1];
      ++i
    ) {
      ds.addSelection(document.getElementsByClassName("item")[i]);
    }
  }

  const getBegin = (idx) => {
    logOnlyDevelopment("idx", idx);
    return script[idx].begin;
  };

  const getEnd = (idx) => {
    return script[idx].end;
  };

  const repeat = () => {
    logOnlyDevelopment("repeat!");
    setTimeout(() => {
      const selectedElements = document.getElementsByClassName("ds-selected");
      const [beginIndex, endIndex] = getIndex(selectedElements);
      const begin = getBegin(beginIndex);
      const end = getEnd(endIndex) + 1;

      const lastElement = document.getElementById(`idx${endIndex}`);
      if (document.getElementsByClassName("playing").length > 0) {
        lastElement.classList.remove("playing");
        clearInterval(repetition);
        repetition = null;
        return;
      }
      lastElement.classList.add("playing");

      if (player.current) player.current.seekTo(begin, "seconds");
      else player.seek(begin);

      dsSelected = ds.getSelection();
      const len = (end - begin) * 1000;
      repetition = setInterval(() => {
        logOnlyDevelopment("interval start", repeatStore.getState());
        if (player.current) player.current.seekTo(begin, "seconds");
        else player.seek(begin);
      }, len);
      repeatStore.dispatch({
        type: "PUSH",
        id: repetition,
      });
    }, 40);

    clearTimeout(setTime);
    for (let i = originBegin; i <= originEnd; ++i) {
      ds.addSelection(document.getElementsByClassName("item")[i], false, false);
    }

    if (repetition !== null) clearInterval(repetition);
  };
}

export function getIndex(selectedElements) {
  if (selectedElements.length === 0) return [0, 0];
  const beginIndex = parseInt(selectedElements[0].id.slice(3));
  const endIndex = parseInt(
    selectedElements[selectedElements.length - 1].id.slice(3)
  );

  return [beginIndex, endIndex];
}
