import React, { useState, useRef } from 'react'
import { formatJson, unescapeSequences } from './lib/text'

export default function App(): JSX.Element {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
    } catch (e) {
      // fallback: focus and execPaste
      inputRef.current?.focus()
      document.execCommand('paste')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
    } catch (e) {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = output
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
  }

  function handleFormatJson() {
    try {
      setOutput(formatJson(input))
    } catch (e) {
      setOutput((e as Error).message)
    }
  }

  function handleUnescape() {
    setOutput(unescapeSequences(input))
  }

  return (
    <div className="app">
      <textarea
        ref={inputRef}
        className="pane left"
        placeholder="Paste or type text here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="toolbar">
        <button onClick={handlePaste}>Paste</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleFormatJson}>Format JSON</button>
        <button onClick={handleUnescape}>Unescape</button>
      </div>

      <textarea className="pane right" readOnly value={output} placeholder="Result appears here" />
    </div>
  )
}
