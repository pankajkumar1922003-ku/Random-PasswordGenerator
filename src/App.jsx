import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)

  const passwordRef = useRef(null)

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "~!@#$%^&*()_+_"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, charAllowed, numberAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-8 py-6 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center mb-4 text-[35px]'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            placeholder='password'
            value={password}
            className='outline-none w-full py-4 px-6 text-xl'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-5 py-0.5 shrink-0 cursor-pointer hover:bg-blue-500'
            onClick={copyPassword}>Copy</button>
        </div>


        <div className='flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-xl'>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => { setNumberAllowed((prev) => !prev) }}
              className='cursor-pointer'
            />
            <label className='text-xl'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => { setCharAllowed((prev) => !prev) }}
              className='cursor-pointer'
            />
            <label className='text-xl'>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
