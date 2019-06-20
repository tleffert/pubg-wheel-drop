import { Injectable } from '@angular/core';

import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap} from 'rxjs/operators';

import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import * as WheelActions from './wheel-actions';

@Injectable()
export class WheelEffects {
    constructor(
        private actionStream$: Actions,
    ) {}

    @Effect({
        dispatch: false
    })
    announceLocationWinner$ = this.actionStream$.pipe(
        ofType(WheelActions.announceLocationWinner),
        tap(({location}) => {
            swal({
                html: location.winner_message,
                title: `${location.text}!!!`,
                confirmButtonText: 'The Wheel Provides',
                allowOutsideClick: true
            });
        })
    )

}
