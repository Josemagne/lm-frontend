import React, { useEffect, useRef, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import styles from "./editor.module.scss"
import axios from "axios"

const EditorPage = () => {
  const editorRef = useRef(null)
  const [value, setValue] = useState("")

  const handleChange = (str: string) => {
    setValue(str)
    console.log("change: ", str)
  }

  const selectionHandler = (selection: ReactQuill.Range) => {
    if (!selection) return
    console.log("selection: ", selection)
    console.log("value:", value.substring(selection.index, selection.length))
    console.log("value2:", value)
  }

  useEffect(() => {
    console.log("editor: ", editorRef.current)
  }, [])

  return (
    <div className={`lm-page ${styles.editor}`}>
      <h1>Editor</h1>
      <ReactQuill
        ref={editorRef}
        modules={{
          toolbar: true,
        }}
        value={value}
        onChangeSelection={(selection) => selectionHandler(selection)}
        onChange={(v: string) => handleChange(v)}
      />
    </div>
  )
}

export default EditorPage
