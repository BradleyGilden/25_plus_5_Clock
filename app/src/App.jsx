import './App.css'
import { useState } from 'react'

function App() {
  // state values to control session and break length
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const props = {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
  };
  return (
    <div className="grid place-items-center w-screen h-screen bg-bg text-fg font-pp">
      <div className="flex-col py-10 items-center h-screen w-full sm:w-[min(100vw,80vh)] border-2 border-fg">
        <h1 id="title" className="text-4xl mb-10 text-center">25 + 5 Clock</h1>
        <Controls {...props} />
      </div>
    </div>
  );
}

// break and session length controls
const Controls = (props) => {
  const { 
    sessionLength,
    setSessionLength,
    breakLength,
    setBreakLength,
  } = props;
  return (
    <div id="controls" className="flex justify-between">
      <SessionBreak length={breakLength} setter={setBreakLength} label={"Break"}/>
      <SessionBreak length={sessionLength} setter={setSessionLength} label={"Session"}/>
    </div>
  );
}

const SessionBreak = ({ length, setter, label }) => {
  const setIncrement = () => {
    let newLength = length + 1;
    newLength = newLength > 60 ? 60 : newLength;
    setter(newLength);
  }
  const setDecrement = () => {
    let newLength = length - 1;
    newLength = newLength < 1 ? 1 : newLength;
    setter(newLength);
  }

  return (
    <div className="flex-col">
    <h2 id={`${label.toLowerCase()}-label`} className="text-2xl sm:text-3xl pb-2">{ label } Length</h2>
    <div className="flex justify-around">
      <button id={`${label.toLowerCase()}-decrement`} onClick={setDecrement} type="button" className="bg-down-arrow bg-contain bg-no-repeat h-10 w-10"></button>
      <p id={`${label.toLowerCase()}-length`} className="text-3xl">{ length }</p>
      <button id={`${label.toLowerCase()}-increment`} onClick={setIncrement} type="button" className="bg-up-arrow bg-contain bg-no-repeat h-10 w-10"></button>
    </div>
  </div>
  );
}

export default App
