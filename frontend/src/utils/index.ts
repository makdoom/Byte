/* eslint-disable @typescript-eslint/no-explicit-any */

export const getsWordsCharCounts = (value: string) => {
  let wordsCount = 0;
  let charCounts = 0;

  const parsedValues = JSON.parse(value);
  const onlyValues = Object.values(parsedValues);

  onlyValues.forEach((item: any) => {
    const text = item.value[0].children[0].text;
    if (text) {
      wordsCount += text.split(" ").length;
      charCounts += text.length;
    }
  });

  return { wordsCount, charCounts };
};
