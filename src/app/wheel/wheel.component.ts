import { Component, OnInit } from '@angular/core';

import { filter, tap, takeWhile, switchMap, take } from 'rxjs/operators';

import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import { LocationApiService } from '@app/api';
import { EventService } from '../shared/services/eventService.service';

import { Location, WheelConfig, wheelConfigDefaultConf, WheelOption } from '@app/types';
import bonusEntries from './bonus_wheel_entries.json';

import { Store } from '@ngrx/store';
import { MapSelectors, MapEntity, LocationSelectors, LocationEntity, WheelActions } from '@app/store';

declare var $: any;

let Winwheel = require('../Winwheel');
// declare var Winwheel: any;
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent implements OnInit {
    private wheel : any;
    private bonusWheel : any;
    private wheelSegments : object[];
    private wheelSpinning : boolean;
    private wheelPower : number;

    private bonus : object[];

    private mapSelection : string;
    private currentMap : string;
    private currentMapLocations : any;

    private showBonus : boolean = false;


    private selectedMap: MapEntity;

    private wheelConfig: WheelConfig = wheelConfigDefaultConf;

  constructor(
      private store: Store<any>,
      private locationApi : LocationApiService,
      private eventService : EventService
  ) {
    this.bonus = bonusEntries;
    console.log(this.bonus);

  }

  ngOnInit() {

      this.showBonus = false;
      this.wheelSegments = [];

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
             return this.store.select(LocationSelectors.getLocationsByMap(selectedMap))
             .pipe(
                 filter(locations => !!locations.length),
                 // Will rerun everytime a location is selcted for x number of total locations
                 tap(locations => {
                     // reset the segments
                     this.wheelSegments = [];
                     locations.forEach(location => {
                        if(location.selected) {
                            // add the selected locations to the wheel
                            this.addOption(location);
                        }
                     });
                     this.initWheel();
                 })
             )
         })
     ).subscribe();
  }

  addOptions(options) : void {
      options.forEach(option => {
        option.selected = true;
        switch(option.level) {
            case 1: option.fillStyle = '#1d5d1d'; break;
            case 2: option.fillStyle = '#ea9904'; break;
            case 3: option.fillStyle = '#e02626'; break;
        }
     })
     this.wheelSegments = this.wheelSegments.concat(options);
     this.initWheel();
  }

  addOption(location: LocationEntity) :void {
      let option: WheelOption = {
          location: location,
          fillStyle: null,
          text: location.text
      };
      switch(option.location.level) {
          case 1: option.fillStyle = '#1d5d1d'; break;
          case 2: option.fillStyle = '#ea9904'; break;
          case 3: option.fillStyle = '#e02626'; break;
      }
      this.wheelSegments.push(option);
  }


  spin() : void {
      // Begin the spin animation by calling startAnimation on the wheel object.
      if(this.showBonus || this.selectedMap.name === 'Bonus') {
          this.bonusWheel.startAnimation();
      } else {
          this.wheel.startAnimation();
      }
  }

  announceLocation(showBonus?) : void {
      let winner;
      if(showBonus || this.selectedMap.name === 'Bonus') {
          winner = this.bonusWheel.getIndicatedSegment();
      } else {
          winner = this.wheel.getIndicatedSegment();
      }
      if(winner.text === 'Bonus') {
          this.showBonus = true;
        swal({
            text : "ITS BONUS TIME, GIVE THE BONUS WHEEL A SPIN",
            allowOutsideClick: false
        });
        this.initBonusWheel();

      } else {
         let winner =  this.wheel.getIndicatedSegment();
         this.store.dispatch(WheelActions.announceLocationWinner({location: winner['location']}));
      }
  }

  reset() : void {
      if(this.showBonus || this.selectedMap.name === 'Bonus') {
          this.bonusWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
          this.bonusWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
          this.bonusWheel.draw();                // Call draw to render changes to the wheel.
          this.wheelSpinning = false;
      } else {
          this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
          this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
          this.wheel.draw();                // Call draw to render changes to the wheel.
          this.wheelSpinning = false;
      }
  }

  initWheel(initText?) : void {
    this.wheelSegments.sort(function(a, b){return 0.5 - Math.random()});
    if(this.bonusWheel){
        this.bonusWheel.clearCanvas();
    }
    let config = wheelConfigDefaultConf;
    config.numSegments = this.wheelSegments.length;
    config.segments = this.wheelSegments;
    config.animation.duration = (Math.random()+1)*5;
    config.animation.callbackFinished = () => {this.announceLocation()};
    this.wheel = new Winwheel(config);
  }

  initBonusWheel() : void {
      this.wheel.clearCanvas();

      let bonusConfig = wheelConfigDefaultConf;
      bonusConfig.numSegments = this.wheelSegments.length;
      bonusConfig.segments = this.wheelSegments;
      bonusConfig.animation.duration = (Math.random()+1)*5;
      bonusConfig.animation.callbackFinished = () => {this.announceLocation()};
      bonusConfig.fillStyle = '#99019a',

      this.bonusWheel = new Winwheel(bonusConfig);

     this.bonusWheel.draw();
  }
}
