import { Component, OnInit, Input, OnDestroy, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { OverlayService } from 'app/shared/services/overlay.service';
import { Location } from '@app/types';
import { WheelSelectors, WheelActions } from '@app/store';
import { Store } from '@ngrx/store';
import { Observable, EMPTY, Subject } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { tap, share, filter, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-winner-announce',
    templateUrl: './winner-announce.component.html',
    styleUrls: ['./winner-announce.component.scss']
})
export class WinnerAnnounceComponent implements OnInit, OnDestroy {
    // animationState: 'void' | 'enter' | 'leave' = 'enter';
    winner$: Observable<any>;

    constructor(
        private store: Store<any>,
        private overlayService: OverlayService
    ) {}

    ngOnInit() {
        this.winner$ = this.store.select(WheelSelectors.getWinner)
        .pipe(
            filter(winner => !!winner),
            shareReplay(1)
        );
    }

    dismiss() {
        this.overlayService.dismiss();
    }

    ngOnDestroy() {
        this.store.dispatch(WheelActions.clearWinner());
    }

}
