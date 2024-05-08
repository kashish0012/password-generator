import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed){
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*-_=+"
    }

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 49);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full max-w-md mx-auto shadow-md border border-gray-60 rounded-lg backdrop-blur-sm px-5 py-4 my-8 bg-gray/30 text-orange-500 ">
        <h1 className='text-center text-2xl text-white my-3 mb-10'>Generate a Password</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='Password' 
          readOnly
          ref={passwordRef} />

          <button 
          onClick={copyPasswordToClip}
          className="outline-none hover:bg-blue-500 bg-blue-700 text-white text-center px-3 py-0.5 shrink-0">Copy</button>

        </div>
        <div className="flex text-sm gap-x-2 mb-2">
          <div className='flex items-center gap-x-4'>
            <input 
            type="range"
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                    setNumberAllowed((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                    setCharAllowed((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
