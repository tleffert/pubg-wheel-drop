import { Component, OnInit } from '@angular/core';

import { filter, tap, takeWhile, switchMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { wheelConfigDefaultConf, WheelSegment } from '@app/types';
import { MapSelectors, MapEntity, LocationSelectors, LocationEntity, WheelActions } from '@app/store';

let Winwheel = require('../Winwheel');
import bonusEntries from './bonus_wheel_entries.json';

// declare var Winwheel: any;
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent implements OnInit {
    private wheel : any;

    private wheelSegments : WheelSegment[] = [];
    private bonus : object[];
    private showBonus : boolean = false;
    private selectedMap: MapEntity;
    private cleanup: boolean;

    // Quick mappings for spice level -> fillstyles (probably a better way?)
    private spiceFillStyles = [
        '#FFFFFF',
        '#1d5d1d',
        '#ea9904',
        '#e02626'
    ]

  constructor(
      private store: Store<any>,
      private actionStream$: Actions
  ) {
    this.bonus = bonusEntries;
  }

  ngOnInit() {
     // Getting the selected Map and it's initial set of locations
     this.store.select(MapSelectors.getSelectedMap)
     .pipe(
         // Make sure to filter out null values
        filter(selectedMap => !!selectedMap),
         tap(selectedMap => {
             this.selectedMap = selectedMap;
         }),
         // Since we have a new map we need to also grab it's locations
         switchMap(selectedMap => {
             return this.store.select(LocationSelectors.getSelectedLocationsByMap(selectedMap.name));
         }),
         // Will rerun everytime a location is selcted for x number of total locations
         map(selectedLocations => {
             // Create segments for the wheel to display
             return this.createManySegments(selectedLocations);
         }),
         tap(segments => {
             // Update the wheel with the segments
             this.updateWheel(segments);
         })
     ).subscribe();

     // this.store.select(LocationSelectors.getLocationsByMap(this.selectedMap))

     // Setting up listener for a spin event, to start spinning the wheel.
     this.actionStream$.pipe(
         ofType(WheelActions.startSpin),
         tap(() => {
             this.wheel.startAnimation();
         }),
         takeWhile(() => !this.cleanup)
     ).subscribe();

     // Listener to announce winner when the wheel stops spinning
     this.actionStream$.pipe(
         ofType(WheelActions.endSpin),
         tap(() => {
             this.announceLocation();
         }),
         takeWhile(() => !this.cleanup)
     ).subscribe();
  }

  /**
   * Creates wheel segment and adds to array of segments for the wheel
   * @param location <LocationEntity> from the Store
   */
  addOption(location: LocationEntity) :void {
      let segment: WheelSegment = {
          location: location,
          fillStyle: this.spiceFillStyles[location.level],
          text: location.text
      };
      this.wheelSegments.push(segment);
  }

  /**
   * Creates a list of WheelSegments from a list of LocationEntity
   * @param  locations List of LocationEntity to create WheelSegments from
   * @return WheelSegment[]
   */
  createManySegments(locations: LocationEntity[]): WheelSegment[] {
      return locations.map(location => {
          return {
              location: location,
              fillStyle: this.spiceFillStyles[location.level],
              text: location.text
          }
      });
  }

  /**
   * Dispatches Spin Action to the store
   */
  spin() {
      this.store.dispatch(WheelActions.startSpin());
  }
    /**
     * Dispatches event to announce winning location, pulls indicated segment (winner) from WinWheel
     */
    announceLocation() : void {
        let winner: WheelSegment = this.wheel.getIndicatedSegment();
        this.store.dispatch(WheelActions.announceLocationWinner({location: winner.location}));
    }

    /**
     * Resets the wheel to an initial drawn state
     */
  reset() : void {
      if(this.showBonus || this.selectedMap.name === 'Bonus') {
          // this.bonusWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
          // this.bonusWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
          // this.bonusWheel.draw();                // Call draw to render changes to the wheel.
      } else {
          this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
          this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
          this.wheel.draw();                // Call draw to render changes to the wheel.
      }
  }

    /**
     *  Updates the wheel with the provided segments. First clears drawn canvas,
     * creates a new instance of the wheel and draws it to the canvas.
     * @param segments Segments to be drawn as pieces of the wheel
     */
    updateWheel(segments: WheelSegment[]) {
        segments.sort(function(a, b){return 0.5 - Math.random()});

        if(this.wheel) {
            this.wheel.clearCanvas();
        }

        let config = wheelConfigDefaultConf;
        config.numSegments = segments.length;
        config.segments = segments;
        config.animation.duration = (Math.random()+1)*5;
        config.animation.callbackFinished = () => {
            // Notify store the wheel isn't spinning anymore and annnouce winner
            this.store.dispatch(WheelActions.endSpin());
        };
        this.wheel = new Winwheel(config);
    }

  initBonusWheel() : void {

      this.cleanup = true;

      this.wheel.clearCanvas();

      let bonusConfig = wheelConfigDefaultConf;
      bonusConfig.numSegments = this.wheelSegments.length;
      bonusConfig.segments = this.wheelSegments;
      bonusConfig.animation.duration = (Math.random()+1)*5;
      bonusConfig.animation.callbackFinished = () => {this.announceLocation()};
      bonusConfig.fillStyle = '#99019a';

      this.wheel = new Winwheel(bonusConfig);
      this.wheel.draw();

     //  this.bonusWheel = new Winwheel(bonusConfig);
     //
     // this.bonusWheel.draw();
  }
}
