import {ActionReducer, Action} from '@ngrx/store';

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

// the key for the local storage.
const localStorageKey = '__app_storage__';

export function storageMetaReducer<S, A extends Action = Action> (reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  return function(state: S, action: A): S {
    // reduce the nextState.
    const nextState = reducer(state, action);
    console.log(state, nextState, 'state compare')
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      if (savedState) {
        return savedState
      }
    }
    // save the next state to the application storage.
    setSavedState(nextState, localStorageKey);
    return nextState;
  };
}