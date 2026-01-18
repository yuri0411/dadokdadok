import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "@/utils";

export const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    start();
    setIsRunning(true);
  }, [start]);

  useEffect(() => {
    start();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = null;
    };
  }, [start]);

  return {
    seconds,
    time: formatTime(seconds),
    isRunning,
    pause,
    resume,
  };
};
