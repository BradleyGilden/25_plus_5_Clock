import './App.css';
import { useState } from 'react';

function App() {
  // state values to control session and break length
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(new Date(25*60*1000))
  const props = {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
  };
  return (
    <div className="grid place-items-center w-screen h-screen bg-bg text-fg font-pp">
      <div className="flex flex-col  py-10 items-center h-screen w-screen sm:w-[min(100vw,80vh)] border-2 border-fg">
        <h1 id="title" className="text-4xl mb-10 text-center">25 + 5 Clock</h1>
        <Controls {...props} setTimeLeft={setTimeLeft} />
        <Clock timeLeft={timeLeft} sessionLength={sessionLength} />
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
    setTimeLeft,
  } = props;
  return (
    <div id="controls" className="w-full flex justify-around md:justify-between">
      <SessionBreak length={breakLength} setter={setBreakLength} label={"Break"} isBreak={true} setTimeLeft={setTimeLeft}/>
      <SessionBreak length={sessionLength} setter={setSessionLength} label={"Session"} isBreak={false} setTimeLeft={setTimeLeft}/>
    </div>
  );
}

const SessionBreak = ({ length, setter, label, isBreak, setTimeLeft }) => {
  const setIncrement = () => {
    let newLength = length + 1;
    newLength = newLength > 60 ? 60 : newLength;
    setter(newLength);
    if (!isBreak) setTimeLeft(new Date(newLength*60*1000));
  }
  const setDecrement = () => {
    let newLength = length - 1;
    newLength = newLength < 1 ? 1 : newLength;
    setter(newLength);
    if (!isBreak) setTimeLeft(new Date(newLength*60*1000));
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

// displays the time left in a session or break
const Clock = ({ timeLeft, sessionLength }) => {
  console.log(timeLeft)
  let minutes = sessionLength < 60 ? timeLeft.getMinutes().toString().padStart(2, '0') : '60';
  let seconds = timeLeft.getSeconds().toString().padStart(2, '0');
  return (
    <div id="clock" className="w-1/2 mt-5 py-10 sm:w-[calc(min(100vw,80vh)*0.5)] h-[calc(100vw*0.5)] sm:h-[calc(min(100vw,80vh)*0.5)] text-bg bg-fg rounded-full">
      <h2 id="timer-label" className="text-2xl sm:text-3xl text-center">Session</h2>
      <h1 id="time-left" className="text-center text-[calc(min(100vw,80vh)*0.13)] sm:mt-2">{minutes}:{seconds}</h1>
    </div>
  );
}

export default App
