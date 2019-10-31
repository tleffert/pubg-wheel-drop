import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayService } from 'app/shared/services/overlay.service';
import { Location } from '@app/types';
import { WheelSelectors, WheelActions } from '@app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'app-winner-announce',
    templateUrl: './winner-announce.component.html',
    styleUrls: ['./winner-announce.component.scss'],
    animations: [
      trigger('fade', [
        state('fadeOut', style({ opacity: 0 })),
        state('fadeIn', style({ opacity: 1 })),
        transition('* => fadeIn', animate(ANIMATION_TIMINGS))
      ]),
      trigger('slideContent', [
        state('void', style({ transform: 'translate3d(0, -25%, 0) scale(0.9)', opacity: 0 })),
        state('enter', style({ transform: 'none', opacity: 1 })),
        state('leave', style({ transform: 'translate3d(0, -25%, 0)', opacity: 0 })),
        transition('* => *', animate(ANIMATION_TIMINGS)),
      ])
    ]
})
export class WinnerAnnounceComponent implements OnInit, OnDestroy {
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    winner$: Observable<any>;

    constructor(
        private store: Store<any>,
        private overlayService: OverlayService
    ) { }

    ngOnInit() {
        this.winner$ = this.store.select(WheelSelectors.getWinner);
    }

    dismiss() {
        this.overlayService.dismiss();
    }

    ngOnDestroy() {
        this.store.dispatch(WheelActions.clearWinner());
    }

}
