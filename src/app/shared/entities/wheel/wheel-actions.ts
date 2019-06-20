import { createAction, props} from '@ngrx/store';

import { Location } from '@app/types';
import { LocationEntity } from '@app/store';

export enum Events {
    ANNOUNCE_LOCATION_WINNER = '[Wheel] ANNOUNCE_LOCATION_WINNER',
    START_SPIN = '[Wheel] START_SPIN',
    STOP_SPIN = '[Wheel] STOP_SPIN'
}

export const announceLocationWinner = createAction(
    Events.ANNOUNCE_LOCATION_WINNER,
    props<{location: LocationEntity}>()
)

export const startSpin = createAction(
    Events.START_SPIN
);

export const endSpin = createAction(
    Events.STOP_SPIN
);
