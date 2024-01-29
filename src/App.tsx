import { useEffect, useState } from 'react'
import { Label, Textarea } from 'flowbite-react'
import MarkdownCompiler from './services/MarkdownCompiler'

function App() {
  const [text, setText] = useState('')

  const onTextChange = (e: any) => {
    const { value } = e.target
    const md = new MarkdownCompiler(value)

    const r = md.run()
    setText(r)
  }
  return (
    <div className='w-screen'>
      <h1 className='mb-4 h1'>Markdown Formatter</h1>
      <div className='grid grid-cols-2 gap-2 min-h-[400px]'>
        <Textarea
          id='comment'
          placeholder='Leave a comment...'
          className='py-1.5 px-4'
          rows={4}
          onChange={onTextChange}
        />

        <div
          className='bg-gray-200'
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </div>
    </div>
  )
}

export default App
