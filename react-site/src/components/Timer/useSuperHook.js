import { useReducer, useRef, useState, useEffect, useCallback, useMemo } from 'react';

import reducer, { initialState } from './reducer';

export const useSuperHook = initialTimer => {
    const [ store, dispatch ] = useReducer(reducer, initialState);
    const [ timer, setTimer ] = useState(() => initialTimer);
    const [ showClock, setShowClock ] = useState(true);
    const buttonRef = useRef();
    const countRef = useRef(0);

    // const [ state, setState ] = useState({
    //     timer: 0,
    //     name: 'John',
    //     age: 23
    // });

    useEffect(() => {
        console.log('[COMPONENT DID MOUNT]', timer);

        countRef.current++;
    }, []);

    console.log('[store]', store);

    useEffect(() => {
        console.log('[COMPONENT DID UPDATE]', timer);

        console.log('[countRef.current]', countRef.current);

        return () => {
            console.log('???');
        };
    }, [timer]);

    const changeTimer = useCallback(newTimer => {
        console.log('[timer]', timer);

        setTimer(prevState => prevState + newTimer);
    }, []);

    // const users = ['John', 'Mike', 'Bob']; // [] === []
    const users = useMemo(() => {
        return ['John', 'Mike', 'Bob'];
    }, []);

    const showButtonRef = () => {
        console.log('[buttonRef.current]', buttonRef.current.click());
    };

    const changeUserName = () => {
        dispatch({
            type: 'CHANGE_USER_NAME',
            newName: 'Mike'
        });
    };

    return {
        timer,
        showClock,
        users,
        setShowClock,
        buttonRef,
        changeTimer,
        changeUserName,
        showButtonRef,
    };
};
