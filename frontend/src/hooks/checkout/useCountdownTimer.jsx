import { useState, useEffect } from 'react';

const useCountdownTimer = (initialMinutes = 3, initialSeconds = 0) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(countdown);
        setResend(true);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return { minutes, seconds, resend ,setMinutes,setSeconds,setResend };
};

export default useCountdownTimer;
