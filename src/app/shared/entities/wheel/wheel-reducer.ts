import { createReducer, on, Action } from '@ngrx/store';

import { WheelState, wheelStateInitial } from './wheel-state';
import * as WheelActions from './wheel-actions';

export function wheelStateReducer(state: WheelState | undefined, action: Action){
    return reducer(state, action);
}

export const reducer = createReducer(
    wheelStateInitial,

    on(
        WheelActions.announceLocationWinner,
        (state, {location}) => {
            return {...state, winner: location._id};
        }
    ),

    on(
        WheelActions.clearWinner,
        (state) => {
            return {...state, winner: null}
        }
    ),

    on(
        WheelActions.startSpin,
        (state) => {
            return {...state, spinning: true};
        }
    ),

    on(
        WheelActions.endSpin,
        (state) => {
            return {...state, spinning: false};
        }
    )

);
