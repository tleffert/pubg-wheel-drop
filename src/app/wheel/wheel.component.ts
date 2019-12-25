import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ApplicationRef } from '@angular/core';

import { Location, WheelConfig, wheelConfigDefaultConf, WheelOption } from '@app/types';
import bonusEntries from './bonus_wheel_entries.json';

let Winwheel = require('../Winwheel');
// declare var Winwheel: any;
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent implements OnInit, OnChanges {
    private wheel : any;
    private bonusWheel : any;
    private wheelSegments : object[] = [];
    private spinning: boolean;
    private bonus : object[];

    private showBonus : boolean = false;

    @Input()
    wheelConfig: WheelConfig;

    @Input()
    locations: Location[];

    @Output()
    winner: EventEmitter<Location> = new EventEmitter<Location>();

    @Output()
    spinningChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private appRef: ApplicationRef
  ) {
    this.bonus = bonusEntries;
  }

  ngOnInit() {
      // Merging the wheelConfig input with a default config.
      this.wheelConfig = {...this.wheelConfig, ...wheelConfigDefaultConf};

      if(this.locations) {
          this.initWheel();
          this.locations.forEach(location => {
             if(location.selected) {
                 // add the selected locations to the wheel
                 this.addOption(location);
             }
          });
      }
  }

  ngOnChanges(changes: SimpleChanges) {
      // this.initWheel();
      if(changes.locations && changes.locations.currentValue.length) {
          this.reset();
          this.wheelSegments = [];
          this.locations = changes.locations.currentValue;
          this.locations.forEach(location => {
             if(location.selected) {
                 // add the selected locations to the wheel
                 this.addOption(location);
             }
          });
          this.initWheel();
      }
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

  addOption(location: Location) :void {
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
      // if(this.showBonus || this.selectedMap.name === 'Bonus') {
      //     this.bonusWheel.startAnimation();
      // } else {
      this.spinningChange.emit(true);
      this.wheel.startAnimation();
      // }
  }

  announceLocation(showBonus?) : void {
      let winner;
      // if(showBonus || this.selectedMap.name === 'Bonus') {
      //     winner = this.bonusWheel.getIndicatedSegment();
      // } else {
          winner = this.wheel.getIndicatedSegment();
      // }
      if(winner.text === 'Bonus') {
          this.showBonus = true;
        this.initBonusWheel();

      } else {
         let winner =  this.wheel.getIndicatedSegment();
         // this.store.dispatch(WheelActions.announceLocationWinner({location: winner['location']}));
         this.winner.emit(winner['location']);
      }
  }

  reset() : void {
      // if(this.showBonus || this.selectedMap.name === 'Bonus') {
      //     this.bonusWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
      //     this.bonusWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
      //     this.bonusWheel.draw();                // Call draw to render changes to the wheel.
      //     this.wheelSpinning = false;
      // } else {
          // this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.

      // }
      //
        if(this.wheel) {
            this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
            this.wheel.draw();                // Call draw to render changes to the wheel.
            this.spinningChange.emit(false);
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
    config.animation.callbackFinished = () => {
        this.announceLocation();
        this.spinningChange.emit(false);
        // Need the appRef tick becusae this happens ourside of the context of angular 'zone'
        this.appRef.tick();
    };
    this.wheel = new Winwheel(config);
  }

  initBonusWheel() : void {
      this.wheel.clearCanvas();

      let bonusConfig = wheelConfigDefaultConf;
      bonusConfig.numSegments = this.wheelSegments.length;
      bonusConfig.segments = this.wheelSegments;
      bonusConfig.animation.duration = (Math.random()+1)*5;
      bonusConfig.animation.callbackFinished = () => {
          this.announceLocation();
          this.spinningChange.emit(false);
      };
      bonusConfig.fillStyle = '#99019a',

      this.bonusWheel = new Winwheel(bonusConfig);

     this.bonusWheel.draw();
  }
}
