import DragSelect from "dragselect";

export default function setDragSelect(player, script) {
  let preIcon = null;
  let ds = new DragSelect({
    selectables: document.querySelectorAll('.item'),
    draggability: false,
    callback: e => {
      // 새 버튼 생성
      const selectedElements = document.getElementsByClassName("ds-selected");
      if(selectedElements.length > 0) {
        const repetitionIcon = createRepetitionIcon(getRepeatSection(selectedElements));
        selectedElements[selectedElements.length - 1].append(repetitionIcon);
      }

      // 이전 버튼 삭제, 버튼 클릭시 드래그 셀렉트도 발생하므로 딜레이 주고 삭제
      const repetitionIcons = document.getElementsByClassName("repetition");
      if(preIcon !== null && repetitionIcons.length > 1) {
        setTimeout(() => {
          preIcon.remove()
          preIcon = repetitionIcons[0];
        }, 100);
      }
      else preIcon = repetitionIcons[0];
    }
  });

  let repetition = null;

  const createRepetitionIcon = (section) => {
    const result = document.createElement('i');
    result.className = "repetition xi-repeat";
    result.onclick = () => {startRepeat(section.begin, section.end + 1)};
    return result;
  }

  let originBegin;
  let originEnd;
  let setTime;
  const getRepeatSection = (selectedElements) => {
    const beginIndex = parseInt(selectedElements[0].id.slice(3));
    const endIndex = parseInt(selectedElements[selectedElements.length - 1].id.slice(3));
    setTime = setTimeout(()=> {
      originBegin = beginIndex;
      originEnd = endIndex;
    }, 100);
    const begin = getBegin(beginIndex);
    const end = getEnd(endIndex);
    return {
      begin: begin,
      end: end
    }
  }

  const getBegin = (idx) => {
    return script[idx].begin;
  }

  const getEnd = (idx) => {
    return script[idx].end;
  }

  const startRepeat = (begin, end) => {
    // TODO : 그냥 기존 아이콘 지우고 새로 만들자
    clearTimeout(setTime);
    for(let i = originBegin; i <= originEnd; ++i) {
      ds.addSelection(document.getElementsByClassName("item")[i], false, false);
    }

    if(repetition !== null)
      endRepetition();

    const len = (end - begin) * 1000;

    player.seek(begin);

    repetition = setInterval(() => {
      player.seek(begin);
    }, len);
  }

  const endRepetition = () => {
    clearInterval(repetition);
  }
}