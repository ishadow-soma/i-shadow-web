import DragSelect from "dragselect";
import logOnlyDevelopment from "global/log/log";
import { repeatStore } from "global/store/store";
import Bookmark from "global/Bookmark/Bookmark";

export default function setDragSelect(player, script) {
  let preIcon = null;
  let preBookmarkIcon = null;
  let dsSelected = null;
  const bookmarkApi = new Bookmark();
  let ds = new DragSelect({
    selectables: document.querySelectorAll(".item"),
    area: document.getElementsByClassName("content")[0],
    draggability: false,
    callback: (e) => {
      logOnlyDevelopment("callback!");

      if (repetition) ds.setSelection(dsSelected);

      //removeButtons();
      createNewButtons();

      // 이전 버튼 삭제, 버튼 클릭시 드래그 셀렉트도 발생하므로 딜레이 주고 삭제
      const repetitionIcons = document.getElementsByClassName("repetition");
      const bookmarkIcons = document.getElementsByClassName("bookmark-icon");

      if (preIcon !== null && repetitionIcons.length > 1) {
        setTimeout(() => {
          preIcon.remove();
          preBookmarkIcon.remove();
          preIcon = repetitionIcons[0];
          preBookmarkIcon = bookmarkIcons[0];
        }, 40);
      } else {
        preIcon = repetitionIcons[0];
        preBookmarkIcon = bookmarkIcons[0];
      }
    },
  });

  function createNewButtons() {
    const selectedElements = document.getElementsByClassName("ds-selected");
    if (validateElements(selectedElements)) {
      const repetitionIcon = createRepetitionIcon();
      const bookmarkIcon = createBookmarkIcon();
      const lastElement = selectedElements[selectedElements.length - 1];
      lastElement.append(repetitionIcon);
      lastElement.append(bookmarkIcon);
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

  const createBookmarkIcon = () => {
    const result = document.createElement("i");
    result.className = "xi-bookmark-o bookmark-icon";

    const sentencesId = document.getElementsByClassName("ds-selected");
    result.onclick = () => {
      console.log(sentencesId);
      //bookmarkApi.saveSentence(sentencesId);
    };

    return result;
  };

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
  const beginIndex = parseInt(selectedElements[0].id.slice(3));
  const endIndex = parseInt(
    selectedElements[selectedElements.length - 1].id.slice(3)
  );

  return [beginIndex, endIndex];
}
