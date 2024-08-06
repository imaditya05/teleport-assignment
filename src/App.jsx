import { useRef, useState } from "react";

import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  const starthandler = () => {
    if (intervalRef.current) return; // Prevent multiple intervals

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
    }, 10);
  };

  const lapHandler = () => {
    let newLapArray = [...laps, time];
    setLaps(newLapArray);
  };

  const stopHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
  };

  const timeFormat = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${
      milliseconds < 100 ? "0" : ""
    }${milliseconds < 10 ? "0" : ""}${milliseconds}`;
  };

  return (
    <div>
      <div>{timeFormat(time)}</div>

      <div>
        <button onClick={starthandler}>start</button>
        <button onClick={stopHandler}>stop</button>
        <button onClick={resetHandler}>reset</button>
        <button onClick={lapHandler}>Lap</button>
      </div>

      <div>
        <div>
          {laps.map((time) => {
            return <div> {timeFormat(time)} </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
