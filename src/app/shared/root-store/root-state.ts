import { MapEntityCollectionState, LocationEntityCollectionState } from '@app/store';


export interface RootState {
    maps: MapEntityCollectionState,
    locations: LocationEntityCollectionState
}
