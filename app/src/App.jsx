import './App.css';
import { useState, useEffect, useRef } from 'react';
import audioFile from './alarm.mp3';

function App() {
  // state values to control session and break length
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(new Date(25*60*1000))
  const [playing, setPlaying] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const props = {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    timeLeft,
    setTimeLeft,
    playing,
    setPlaying,
    isSession,
    setIsSession,
  };
  return (
    <div className="grid place-items-center w-screen h-screen bg-bg text-fg font-pp">
      <div className="flex flex-col  py-10 items-center h-screen w-screen sm:w-[min(100vw,80vh)]">
        <h1 id="title" className="text-4xl mb-10 text-center">25 + 5 Clock</h1>
        <TimeControls {...props} />
        <Clock {...props} />
        <PlayControls {...props} />
      </div>
    </div>
  );
}

// break and session length controls
const TimeControls = (props) => {
  const { 
    sessionLength,
    setSessionLength,
    breakLength,
    setBreakLength,
    setTimeLeft,
    playing,
  } = props;
  const bprops = {
    length: breakLength,
    setter: setBreakLength,
    label: "Break",
    isBreak: true,
    setTimeLeft,
    playing,
  }
  const sprops = {
    length: sessionLength,
    setter: setSessionLength,
    label: "Session",
    isBreak: false,
    setTimeLeft,
    playing,
  }
  return (
    <div id="time-controls" className="w-full flex justify-around md:justify-between">
      <SessionBreak {...bprops} />
      <SessionBreak {...sprops} />
    </div>
  );
}

// adjusts the seession and break times
const SessionBreak = (props) => {
  const { length, setter, label, isBreak, setTimeLeft, playing } = props;

  const setIncrement = () => {
    if (!playing) {
      let newLength = length + 1;
      newLength = newLength > 60 ? 60 : newLength;
      setter(newLength);
      if (!isBreak) setTimeLeft(new Date(newLength*60*1000));
    }
  }
  const setDecrement = () => {
    if (!playing) {
      let newLength = length - 1;
      newLength = newLength < 1 ? 1 : newLength;
      setter(newLength);
      if (!isBreak) setTimeLeft(new Date(newLength*60*1000));
    }
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
const Clock = (props) => {
  const { timeLeft, sessionLength, isSession } = props;

  let minutes = sessionLength < 60 ? timeLeft.getMinutes().toString().padStart(2, '0') : '60';
  let seconds = timeLeft.getSeconds().toString().padStart(2, '0');
  return (
    <div id="clock" className="w-1/2 mt-5 py-10 sm:w-[calc(min(100vw,80vh)*0.5)] h-[calc(100vw*0.5)] sm:h-[calc(min(100vw,80vh)*0.5)] text-bg bg-fg rounded-full">
      <h2 id="timer-label" className="text-2xl sm:text-3xl text-center">{ isSession ? "Session": "Break" }</h2>
      <h1 id="time-left" className="text-center text-[calc(min(100vw,80vh)*0.13)] sm:mt-2">{minutes}:{seconds}</h1>
    </div>
  );
}

// implements play, pause and reset functionality
const PlayControls = (props) => {
  const {
    timeLeft, setTimeLeft,
    playing, setPlaying,
    setSessionLength, sessionLength,
    breakLength, setBreakLength,
    isSession, setIsSession
  } = props;

  let intervalRef = useRef(null);
  // toggle the playing state
  const toggle = () => {
    let prev = playing;
    setPlaying(!playing);
    if (!prev) {
      // if the state was previously paused, immediatly decrement
      let newTime = new Date(Number(timeLeft) - 1000);
      setTimeLeft(newTime);
    }
  }
  // reset the timer
  const reset = () => {
    setPlaying(false);
    setTimeLeft(new Date(25*60*1000));
    setSessionLength(25);
    setBreakLength(5);
  }

  useEffect(() => {
    let newTime;
    const playPause = () => {
      if (timeLeft.getSeconds() === 0 && timeLeft.getMinutes() === 0 && isSession) {
        setTimeLeft(new Date(breakLength*60*1000));
        setIsSession(false)
      } else if (timeLeft.getSeconds() === 0 && timeLeft.getMinutes() === 0 && !isSession) {
        setTimeLeft(new Date(sessionLength*60*1000));
        setIsSession(true)
      } else {
        newTime = new Date(Number(timeLeft) - 1000);
        setTimeLeft(newTime);
      }
    }
    intervalRef.current = setInterval(() => {
      if (playing) {
        playPause();
      }
    }, 1000);
    return () => {clearInterval(intervalRef.current)}
  }, [setTimeLeft, timeLeft, setPlaying, playing]);

  useEffect(() => {
    if (!playing) {
      clearInterval(intervalRef.current);
    }
  }, [playing, setPlaying]);

  return (
    <div className="flex gap-5 w-3/5 justify-center items-center mt-6">
      {/* <audio ref={audioRef} src={audioFile} onEnded={handleEnded} /> */}
      <button id="start_stop" type="button" onClick={toggle} className="bg-play-pause bg-contain bg-no-repeat h-20 w-20"></button>
      <button id="reset" type="button" onClick={reset} className="bg-reset bg-contain bg-no-repeat h-[4.5rem] w-[4.5rem]"></button>
    </div>
  );
}

export default App
