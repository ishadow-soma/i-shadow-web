export default function setScript(player, script) {
  const setScript = () => {
    const insertHere = document.getElementById("script");
    script.forEach((sentence, index) => insertHere.append(createListItem(index, sentence)));
  }

  const createListItem = (index, sentence) => {
    const result = document.createElement('li');
    result.className = "item";
    result.id = `idx${index}`;
    createElements(sentence).forEach(it => result.append(it));
    return result;
  }

  const createElements = (sentence) => {
    return [createTimeStamp(sentence), createSentence(sentence)]
  }

  const createTimeStamp = (sentence) => {
    const result = document.createElement('button');
    result.innerText = `${parseInt(sentence.begin / 60)}:${parseInt(sentence.begin % 60)}`;
    result.className = "time-stamp";
    result.onclick = () => onSeek(sentence.begin);
    return result;
  }

  const createSentence = (sentence) => {
    const result = document.createElement('p');
    result.innerText = sentence.sentence;
    return result;
  }

  const onSeek = (seconds = 40) => {
    player.seek(seconds);
    const selectedItem = document.getElementsByClassName("ds-selected")[0];
    removeClass(selectedItem, "ds-selected");
  };

  const removeClass = (element, className) => {
    if(element === undefined) return;

    if(element.className.search(className) !== -1)
      element.className = element.className.replace(className, " ").trim();
  }

  setScript();
}