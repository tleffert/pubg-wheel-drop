import { createFeatureSelector, createSelector} from '@ngrx/store';
import { WheelState } from './wheel-state';
import { selectLocationEntityState } from  '../location/location-selectors';

// Selects the Map collection slice from the store
export const selectWheelState = createFeatureSelector<WheelState>('wheel');

export const getWinner = createSelector(
    selectWheelState,
    selectLocationEntityState,
    (wheelState, locationState) => {
        if(wheelState.winner) {
            return locationState.entities[wheelState.winner];
        }
        return null;
    }
);

export const getWheelSpinning = createSelector(
    selectWheelState,
    (state) => {
        return state.spinning;
    }
);
