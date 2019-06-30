import { createFeatureSelector, createSelector} from '@ngrx/store';
import { WheelState } from './wheel-state';

// Selects the Wheel slice from the store
export const selectWheelState = createFeatureSelector<WheelState>('wheel');
