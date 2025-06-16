import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect } from "react";

export default function Timer({ time, setTime, timerActive, setTimerActive }) {

    useEffect(() =>{
        let interval = null;
        if(timerActive) {
            interval = setInterval(() =>{
                setTime((prevTime) => prevTime +1);
            }, 1000);
        }
        
        return () => clearInterval(interval);
    }, [timerActive, setTime]);

    const handleToggle = () => {
        setTimerActive((prev) => !prev);
    }

    const handleReset = () => {
        setTime(0);
        setTimerActive(false);
    }

    return (
        <div className="flex items-center gap-4">
          <p className="text-white">Time: {time}s</p>
          <button
            onClick={handleToggle}
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
          >
            {timerActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
          >
            Reset
          </button>
        </div>
      );
}