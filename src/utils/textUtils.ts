
/**
 * Renders text with line breaks by splitting on newlines and inserting <br /> elements
 */
export const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
};
