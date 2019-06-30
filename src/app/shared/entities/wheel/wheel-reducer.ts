import { createReducer, on, Action } from '@ngrx/store';

import { WheelState, wheelStateInitial } from './wheel-state';
import * as WheelActions from './wheel-actions';

export function wheelStateReducer(state: WheelState | undefined, action: Action){
    return reducer(state, action);
}

export const reducer = createReducer(
    wheelStateInitial,

    on(
        WheelActions.startSpin,
        (state) => {
            let updatedState = {...state};
            updatedState.spinning = true;
            return updatedState;
        }
    ),

    on(
        WheelActions.endSpin,
        (state) => {
            let updatedState = {...state};
            updatedState.spinning = false;
            return updatedState;
        }
    )
)
