import { ActionReducer, MetaReducer } from '@ngrx/store';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { LocalStorageService } from './localStorageService';


export function hydrateState(actionKey: string) {
    return _hydrateState(actionKey);
}

/**
 * MetaReducer function that can be used to rehydrate the state from local storage.
 * Listens to the ROOT_EFFECTS_INIT action to trigger the hydrate step.
 * @param  actionKey Key to match with in local storage
 */
export function _hydrateState(actionKey: string) {
    return function(reducer: ActionReducer<any>): ActionReducer<any> {
        return function(state, action) {
            // Calculating the state, so that we can save it or other things
            let reducedState = reducer(state, action);
            if(action.type === ROOT_EFFECTS_INIT) {

                let savedLocationState = LocalStorageService.getSavedState(actionKey);

                // Stored data is still good
                // Merging the savedState into what should be the initial state.
                reducedState = {...state, ...savedLocationState};

            }
            return reducedState;
        };
    }
}

export function storeStateSlice(actionKey: string) {
    return _storeStateSlice(actionKey);
}

/**
 * MetaReducer that will match actions with the provided actionKey, calculate the new state
 * from that action, store the results in local storage and pass the calculated state
 * @param  actionKey Key to store state results to in local storage
 */
export function _storeStateSlice(actionKey: string) {
    return function(reducer: ActionReducer<any>): ActionReducer<any> {
        return function(state, action) {
            // Calculating the state, so that we can save it or other things
            let reducedState = reducer(state, action);

            // Saving the state after every location action
            if(action.type.startsWith(actionKey)) {
                LocalStorageService.setSavedState(reducedState, actionKey);
            }
            return reducedState;
        };
    }
}
