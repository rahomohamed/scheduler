import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
  
    if (replace) {
      setMode(mode);
    } else {
  
      setMode(mode);
      setHistory([...history, mode]);
    }
  };
  const back = function() {
  
  const hist = [...history].slice(0, history.length-1);

    if (hist.length >= 1) {
    setHistory(hist);
    setMode(hist[hist.length - 1]);
  }
};

  return { mode, transition, back };
};