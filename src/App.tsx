import { Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { LOCALSTORAGE_KEYS } from './constants'
import MarkdownCompiler from './services/MarkdownCompiler'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    const savedText = localStorage.getItem(
      LOCALSTORAGE_KEYS.markdown_text_output
    ) as string

    const savedInput = localStorage.getItem(
      LOCALSTORAGE_KEYS.markdown_text_input
    ) as string

    setInput(savedInput)
    setOutput(savedText)
  }, [])

  const onTextChange = (e: any) => {
    const { value } = e.target
    setInput(value)

    const md = new MarkdownCompiler(value)
    const result = md.run()
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_output, result)
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_input, value)
    setOutput(result)
  }
  return (
    <div className='w-screen'>
      <h1 className='mb-4 h1'>Markdown Formatter</h1>
      <div className='grid grid-cols-2 gap-2 min-h-[400px]'>
        <Textarea
          value={input}
          id='comment'
          placeholder='Leave a comment...'
          className='py-1.5 px-4'
          rows={4}
          onChange={onTextChange}
        />

        <div
          className='bg-gray-200'
          dangerouslySetInnerHTML={{
            __html: output,
          }}
        />
      </div>
    </div>
  )
}

export default App
