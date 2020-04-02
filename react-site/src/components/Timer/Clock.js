import React, { memo, useEffect, useContext } from 'react';

import { TimerContext } from './Timer';

const Clock = ({ changeTimer }) => {
    console.log('RENDER');

    useEffect(() => {
        return () => {
            console.log('COMPONENT WILL UNMOUNT...');
        };
    }, []);

    const context = useContext(TimerContext);

    console.log('[context]', context);

    return (
        <div>Clock</div>
    );
};

export default memo(Clock);

// export default memo(Clock, (prevProps, nextProps) => {
//     if (prevProps.changeTimer === nextProps.changeTimer) {
//         return true;
//     }

//     return false;
// });
