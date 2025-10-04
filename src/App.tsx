import React, { useState, useRef, useEffect } from 'react'
import { formatJson, unescapeSequences } from './lib/text'

type Toast = { id: number; text: string }

export default function App(): JSX.Element {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [toasts, setToasts] = useState<Toast[]>([])
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    } catch {
      return 'dark'
    }
  })
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const nextToastId = useRef(1)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  function pushToast(text: string, ttl = 3000) {
    const id = nextToastId.current++
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, ttl)
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setInput(text)
      pushToast('Pasted from clipboard')
    } catch (e) {
      // fallback: focus and execPaste
      inputRef.current?.focus()
      document.execCommand('paste')
      pushToast('Paste fallback used')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output)
      pushToast('Copied to clipboard')
    } catch (e) {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = output
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      pushToast('Copied (fallback)')
    }
  }

  function handleFormatJson() {
    try {
      setOutput(formatJson(input))
      pushToast('Formatted JSON')
    } catch (e) {
      const msg = (e as Error).message
      setOutput(msg)
      pushToast(msg)
    }
  }

  function handleUnescape() {
    setOutput(unescapeSequences(input))
    pushToast('Unescaped sequences')
  }

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    pushToast('Theme changed')
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
        <button onClick={handlePaste} className="icon-btn" title="Paste">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="M16 4h-2.5l-1-1h-3l-1 1H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="label">Paste</span>
        </button>

        <button onClick={handleCopy} className="icon-btn" title="Copy">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <rect x="9" y="9" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="label">Copy</span>
        </button>

        <button onClick={handleFormatJson} className="icon-btn" title="Format JSON">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="M8 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 8h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="label">Format JSON</span>
        </button>

        <button onClick={handleUnescape} className="icon-btn" title="Unescape">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path d="M3 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="label">Unescape</span>
        </button>
        {/* theme toggle pinned to bottom of toolbar */}
        <button onClick={toggleTheme} className="icon-btn theme-toggle" title="Toggle theme">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <textarea className="pane right" readOnly value={output} placeholder="Result appears here" />

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">{t.text}</div>
        ))}
      </div>
    </div>
  )
}
