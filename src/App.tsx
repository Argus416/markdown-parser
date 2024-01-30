import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LOCALSTORAGE_KEYS } from './constants'
import MarkdownCompiler from './services/MarkdownCompiler'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [textareaScrollTop, setTextareaScrollTop] = useState(0)
  const outputRef = useRef<HTMLDivElement | null>(null)
  const md = new MarkdownCompiler()

  useEffect(() => {
    const savedText = localStorage.getItem(
      LOCALSTORAGE_KEYS.markdown_text_output
    ) as string

    const savedInput = localStorage.getItem(
      LOCALSTORAGE_KEYS.markdown_text_input
    ) as string

    setInput(savedInput ?? '')
    setOutput(savedText ?? '')
  }, [])

  useEffect(() => {
    console.log(
      localStorage.getItem(LOCALSTORAGE_KEYS.markdown_text_input) === null
    )
    if (localStorage.getItem(LOCALSTORAGE_KEYS.markdown_text_input) !== null)
      return

    const template = `# Markdown Example

## Title 1
### Title 2
#### Title 3
##### Title 4
###### Title 5

---

- List Element
- Another List Element

---

Some ***inline*** ==styling== as you \`see\`

---

![This is a Photo](https://images.immediate.co.uk/production/volatile/sites/3/2023/03/Jujutsu-Kaisen-Cropped-dbe733b.jpg?quality=90&resize=844,563)

---

[Visit My GitHub Repo](https://github.com/Argus416)
`
    md.start(template)
    const result = md.run()
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_input, template)
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_output, result)
  }, [])

  useEffect(() => {
    outputRef.current?.scroll({ top: textareaScrollTop })
  }, [textareaScrollTop])

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setInput(value)

    md.start(value)
    const result = md.run()
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_output, result)
    localStorage.setItem(LOCALSTORAGE_KEYS.markdown_text_input, value)
    setOutput(result)
  }
  return (
    <div
      className='
        flex flex-col items-center justify-center gap-8 h-screen 
        w-[900px] mx-auto
     '>
      <h1 className='h1 text-center'>Markdown Parser</h1>
      <div className='grid grid-cols-2 gap-2 h-[80vh] w-full'>
        <textarea
          value={input}
          id='comment'
          placeholder='Start typing ...'
          className=' border border-gray-200 py-4 px-4'
          rows={4}
          onChange={onTextChange}
          onScroll={e =>
            setTextareaScrollTop((e.target as HTMLTextAreaElement).scrollTop)
          }
        />
        <div
          ref={outputRef}
          className=' border border-gray-200 py-4 px-4'
          dangerouslySetInnerHTML={{
            __html: output,
          }}
        />
      </div>
    </div>
  )
}

export default App
