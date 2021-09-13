export default function ScriptPutter(sentence) {
  const createSentence = (sentence) => {
    const result = document.createElement('p');
    result.innerText = sentence.sentence;
    return result;
  }

  console.log("script putter")
  return createSentence(sentence);
}