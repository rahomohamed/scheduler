import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
  
    if (replace) {
      setMode(mode);
    } else {
  
      setMode(mode);
      setHistory(prev => ([...prev, mode]))
    }
  };
  const back = function() {
  
   // if history array is greater than one the set Mode to the second last value
   if (history.length > 1) setMode(history[history.length - 2]);
   setHistory(prev => [...prev.slice(0, prev.length - 1)]);
  }

  return { mode, transition, back };
};