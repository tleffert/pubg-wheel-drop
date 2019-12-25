import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { WinnerAnnounceComponent } from 'app/winner-announce/winner-announce.component';


@Injectable({
  providedIn: 'root'
})
export class OverlayService {

    private overlayRef: OverlayRef;

    winnerAnnouncePortal: ComponentPortal<WinnerAnnounceComponent>;

    constructor(
        private overlay: Overlay,
    ) {}

    /**
     * Will create and pop up overlay with provided component, and custom config
     * @param  component Component to dynamically load in overlay
     * @param  config    custom configuration for material overly
     * @return           [description]
     */
    createOverlay() {
        this.winnerAnnouncePortal = new ComponentPortal(WinnerAnnounceComponent);
        let overlayConfig = new OverlayConfig();

        overlayConfig.positionStrategy = this.overlay.position().global();

        overlayConfig.hasBackdrop = true;
        overlayConfig.backdropClass = 'dark-backdrop';

        this.overlayRef = this.overlay.create(overlayConfig);

        this.overlayRef.attach(this.winnerAnnouncePortal);
    }

    /**
     * Tears down the overlay, and removes from the DOM
     * @return [description]
     */
    dismiss() {
        this.overlayRef.dispose();
    }

}
