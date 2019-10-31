import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
    ) {

    }

    /**
     * Will create and pop up overlay with provided component, and custom config
     * @param  component Component to dynamically load in overlay
     * @param  config    custom configuration for material overly
     * @return           [description]
     */
    createOverlay(component: ComponentType<any>, config?: OverlayConfig ) {
        let positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        config = new OverlayConfig({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            positionStrategy,
            ...config
        });

        this.overlayRef = this.overlay.create(config);
        this.overlayRef.attach(new ComponentPortal(component));
    }

    /**
     * Tears down the overlay, and removes from the DOM
     * @return [description]
     */
    dismiss() {
        this.overlayRef.dispose();
    }

}
