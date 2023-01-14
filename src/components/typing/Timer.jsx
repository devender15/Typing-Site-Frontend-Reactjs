import React, { useState, useEffect } from "react";

function Timer(props) {
  const [time, setTime] = useState(props.duration);

  function reset() {
    setTime(props.duration);
    props.setStartCounting(false);
  }

  useEffect(() => {
    let interval = null;
    if (props.startCounting) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time > 0) {
            return time - 1;
          } else {
            reset();
            return 0;
          }
        });
      }, 1000);
    } else if (!props.startCounting && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.startCounting, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <p className="text-sm font-semibold">
        Time Left : {isNaN(minutes) ? 0 : minutes}:{isNaN(seconds) ? 0 : seconds}{" "}
      </p>
    </div>
  );
}

export default React.memo(Timer);
