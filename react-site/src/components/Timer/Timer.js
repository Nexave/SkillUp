import React, { createContext } from 'react';

import Clock from './Clock';
import { useSuperHook } from './useSuperHook';

export const TimerContext = createContext();

const Timer = () => {
    const {
        timer,
        showClock,
        users,
        buttonRef,
        setShowClock,
        changeTimer,
        changeUserName,
        showButtonRef
    } = useSuperHook(23);

    return (
        <div className="timer">
            <h1>{timer}</h1>

            <div>
                {
                    showClock &&
                        <TimerContext.Provider value={{ myTimer: timer }}>
                            <Clock
                                users={users}
                                changeTimer={changeTimer}
                            />
                        </TimerContext.Provider>
                }

                <button onClick={changeUserName}>CHANGE USER NAME</button>
                <button onClick={showButtonRef}>SHOW BUTTON REF</button>
                <button onClick={() => setShowClock(false)}>HIDE CLOCK</button>
                <button ref={buttonRef} onClick={() => changeTimer(-1)}>-1</button>
                <button onClick={() => changeTimer(1)}>+1</button>
                <button onClick={() => changeTimer(-5)}>-5</button>
                <button onClick={() => changeTimer(5)}>+5</button>
            </div>
        </div>
    );
};

export default Timer;
