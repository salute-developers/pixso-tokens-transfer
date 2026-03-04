import { useState, useCallback } from 'react';
import type { Screen } from 'types';

export type Direction = 'forward' | 'back';

interface TransitionState {
    current: Screen;
    prev: Screen | null;
    direction: Direction;
}

export const useScreenTransition = (initial: Screen) => {
    const [state, setState] = useState<TransitionState>({
        current: initial,
        prev: null,
        direction: 'forward',
    });

    const navigate = useCallback((to: Screen, dir: Direction) => {
        setState((s) => ({ current: to, prev: s.current, direction: dir }));
    }, []);

    const onExited = useCallback(() => {
        setState((s) => ({ ...s, prev: null }));
    }, []);

    return {
        screen: state.current,
        prevScreen: state.prev,
        direction: state.direction,
        navigate,
        onExited,
    };
};
