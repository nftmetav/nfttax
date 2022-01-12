export function truncateString(input, maxLen, style) {
  if (input.length <= maxLen) {
    return input;
  }

  switch (style) {
    case "right": {
      return `${input.substring(0, maxLen)}...`;
    }
    case "middle": {
      return `${input.substring(0, maxLen / 2)}...${input.substring(
        input.length - maxLen / 2
      )}`;
    }
    default:
      return input;
  }
}
