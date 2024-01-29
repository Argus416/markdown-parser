import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const toto = (ee: string) => {
    console.log('toto', ee)
  }

  useEffect(() => {
    if (count === 0) {
      console.log('count is 0')
    }
  }, [])
  return (
    <div>
      <img
        src={reactLogo}
        width='200'
        alt='React Logo'
      />
      <Button
        className='prettier-class'
        id='prettier-id'>
        Click me
      </Button>
    </div>
  )
}

export default App
