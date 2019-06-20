import { createReducer, on, Action } from '@ngrx/store';

import { WheelState, wheelStateInitial } from './wheel-state';
import * as WheelActions from './wheel-actions';

export function wheelStateReducer(state: WheelState | undefined, action: Action){
    return reducer(state, action);
}

export const reducer = createReducer(
    wheelStateInitial,
)
