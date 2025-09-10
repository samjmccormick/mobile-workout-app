import { useEffect, useRef, useState } from "react";

export function useTimer(defaultSeconds: number, countDown = true) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [timerLength, setTimerLength] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (countDown) {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, countDown]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newSeconds?: number) => {
    setIsRunning(false);
    setSeconds(newSeconds ?? defaultSeconds);
    setTimerLength(newSeconds ?? defaultSeconds);
  };

  const setDuration = (newSeconds: number) => {
    reset(newSeconds);
  };

  return { seconds, isRunning, timerLength, start, pause, reset, setDuration };
}
