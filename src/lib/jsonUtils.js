export function prettifyJsonFn(text) {
  try {
    const json = JSON.parse(text);
    return JSON.stringify(json, null, 2);
  } catch {
    return "Invalid JSON";
  }
}

export function unescapeFn(text) {
  try {
    return text
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  } catch {
    return "Error during unescaping";
  }
}

export function escapeFn(text) {
  try {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/\t/g, "\\t")
      .replace(/\r/g, "\\r")
      .replace(/"/g, '\\"');
  } catch {
    return "Error during escaping";
  }
}
