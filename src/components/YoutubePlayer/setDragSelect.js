import DragSelect from "dragselect";

export default function setDragSelect(player, script) {
  let preIcon = null;
  let ds = new DragSelect({
    selectables: document.querySelectorAll(".item"),
    draggability: false,
    callback: (e) => {
      // 새 버튼 생성
      const selectedElements = document.getElementsByClassName("ds-selected");
      if (selectedElements.length > 0) {
        const repetitionIcon = createRepetitionIcon();
        selectedElements[selectedElements.length - 1].append(repetitionIcon);
      }

      // 이전 버튼 삭제, 버튼 클릭시 드래그 셀렉트도 발생하므로 딜레이 주고 삭제
      const repetitionIcons = document.getElementsByClassName("repetition");
      if (preIcon !== null && repetitionIcons.length > 1) {
        setTimeout(() => {
          preIcon.remove();
          preIcon = repetitionIcons[0];
        }, 100);
      } else preIcon = repetitionIcons[0];
    },
  });

  let repetition = null;
  let originBegin;
  let originEnd;
  let setTime;
  const createRepetitionIcon = () => {
    const result = document.createElement("i");
    result.className = "repetition xi-repeat";
    result.onclick = () => {
      startRepeat();
    };

    const selectedElements = document.getElementsByClassName("ds-selected");
    const [beginIndex, endIndex] = getIndex(selectedElements);
    setTime = setTimeout(() => {
      originBegin = beginIndex;
      originEnd = endIndex;
    }, 100);

    return result;
  };

  const getBegin = (idx) => {
    return script[idx].begin;
  };

  const getEnd = (idx) => {
    return script[idx].end;
  };

  const startRepeat = () => {
    setTimeout(() => {
      const selectedElements = document.getElementsByClassName("ds-selected");
      const [beginIndex, endIndex] = getIndex(selectedElements);
      const begin = getBegin(beginIndex);
      const end = getEnd(endIndex) + 1;

      player.seek(begin);

      const len = (end - begin) * 1000;
      repetition = setInterval(() => {
        player.seek(begin);
      }, len);
    }, 100);

    clearTimeout(setTime);
    for (let i = originBegin; i <= originEnd; ++i) {
      ds.addSelection(document.getElementsByClassName("item")[i], false, false);
    }

    if (repetition !== null) endRepetition();
  };

  const endRepetition = () => {
    clearInterval(repetition);
  };
}

export function getIndex(selectedElements) {
  const beginIndex = parseInt(selectedElements[0].id.slice(3));
  const endIndex = parseInt(
    selectedElements[selectedElements.length - 1].id.slice(3)
  );

  return [beginIndex, endIndex];
}
