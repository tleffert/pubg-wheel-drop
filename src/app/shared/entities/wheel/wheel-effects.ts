import { Injectable, ComponentFactoryResolver } from '@angular/core';

import { Actions, Effect, ofType} from '@ngrx/effects';
import { map, tap, switchMap} from 'rxjs/operators';

import Swal from 'sweetalert2/dist/sweetalert2.min.js'

import * as WheelActions from './wheel-actions';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { WinnerAnnounceComponent } from 'app/winner-announce/winner-announce.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayService } from 'app/shared/services/overlay.service';

@Injectable()
export class WheelEffects {
    constructor(
        private actionStream$: Actions,
        private overlayService: OverlayService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    @Effect({
        dispatch: false
    })
    announceLocationWinner$ = this.actionStream$.pipe(
        ofType(WheelActions.announceLocationWinner),
        tap(({location}) => {
            this.overlayService.createOverlay(WinnerAnnounceComponent);
        })
    )

}
