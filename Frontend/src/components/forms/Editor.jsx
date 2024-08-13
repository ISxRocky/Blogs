import { useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = ({ value, setValue }) => {
  const editorRef = useRef()

  const handleChange = (content, delta, source, editor) => {
    setValue(content)
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
  ]

  return (
    <ReactQuill
      ref={editorRef}
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      theme='snow'
    />
  )
}
export default Editor
