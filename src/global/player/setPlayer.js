export function getScript(sentences) {
  return sentences.map((sentence) => {
    return {
      sentence: sentence.content,
      begin: getSecondsFromTime(sentence.startTime),
      end: getSecondsFromTime(sentence.endTime),
    };
  });
}

export function getSecondsFromTime(seconds) {
  return (
    parseInt(seconds.split(":")[0]) * 3600 +
    parseInt(seconds.split(":")[1]) * 60 +
    parseFloat(seconds.split(":")[2])
  );
}

export function getTitle(title) {
  if (title.length < 50) return title;
  else return title.slice(0, 50) + "...";
}
