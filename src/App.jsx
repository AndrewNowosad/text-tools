import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prettifyJsonFn, escapeFn, unescapeFn } from "@/lib/jsonUtils";

export default function JsonTextTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const prettifyJson = () => setOutput(prettifyJsonFn(input));
  const unescape = () => setOutput(unescapeFn(input));
  const escape = () => setOutput(escapeFn(input));

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      alert("Failed to read clipboard content");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      alert("Failed to copy to clipboard");
    }
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto h-[100vh] grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
      <Textarea
        className="h-full w-full border border-gray-300 resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your text here..."
      />

      <div className="flex flex-col justify-center items-center gap-2">
        <Button className="border border-gray-300 w-32" onClick={pasteFromClipboard}>Paste</Button>
        <Button className="border border-gray-300 w-32" onClick={copyToClipboard}>Copy</Button>
        <Button className="border border-gray-300 w-32" onClick={prettifyJson}>Prettify JSON</Button>
        <Button className="border border-gray-300 w-32" onClick={unescape}>Unescape</Button>
        <Button className="border border-gray-300 w-32" onClick={escape}>Escape</Button>
      </div>

      <Textarea
        className="h-full w-full border border-gray-300 resize-none"
        value={output}
        readOnly
        placeholder="Result will appear here..."
      />
    </div>
  );
}
