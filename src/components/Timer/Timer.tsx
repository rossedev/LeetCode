import { FC, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdOutlineTimer } from 'react-icons/md';

type TimerProps = {};

const Timer: FC<TimerProps> = () => {
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showTimer) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [showTimer]);

  const _isDigit = (value: number) => {
    return value < 10 ? '0' + value : value;
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${_isDigit(hours)}:${_isDigit(minutes)}:${_isDigit(seconds)}`;
  };

  const initTimer = () => {
    setShowTimer(true);
  };

  const stopTimer = () => {
    setShowTimer(false);
    setTime(0);
  };

  return (
    <div>
      {showTimer ? (
        <div className="flex items-center space-x-2 bg-dark-fill-3 p-1.5 cursor-pointer rounded hover:bg-dark-fill-2">
          <div>{formatTime(time)}</div>
          <FiRefreshCcw onClick={stopTimer} />
        </div>
      ) : (
        <div
          className="flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer"
          onClick={initTimer}
        >
          <MdOutlineTimer className="text-2xl" />
        </div>
      )}
    </div>
  );
};
export default Timer;
