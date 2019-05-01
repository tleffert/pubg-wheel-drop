import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import { LocationApiService } from '@app/api';
import { EventService } from '../shared/services/eventService.service';

import { Location } from '@app/types';
import bonusEntries from './bonus_wheel_entries.json';

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

    private locationsReady : boolean;
    private locations1 : Location[];
    private locations2 : Location[];
    private locations3 : Location[];
    private bonus : object[];

    private mapSelection : string;
    private currentMap : string;
    private currentMapLocations : any;
    private erangel : any;
    private miramar : any;
    private ready : boolean;

    private init : boolean;

    private toggleLocationSelect : boolean;
    private showSidebar : boolean = true;
    private showGreenScreen : boolean = false;
    private showBonus : boolean = false;

  constructor(
      private locationApi : LocationApiService,
      private eventService : EventService
  ) {
    this.bonus = bonusEntries;
    console.log(this.bonus);

  }

  ngOnInit() {

      this.showBonus = false;
      this.toggleLocationSelect = true;
      this.init = true;
      this.wheelSegments = [];
      this.currentMap = "erangel";
      this.erangel = {};
      this.miramar = {};

     // Listener to monitor changes in the selected mapSelection
     // Triggers the wheel to update to newly selected map
     this.eventService.on("MAP_SELECT", map => {
         this.checkMapSelection(map);
     });

     // Registering listener for selecting locations for a particular map
     this.eventService.on("LOCATION_SELECTED", selectedLocation => {
         this.addOption(selectedLocation);
     });

  }

  // Updates the Location selection from the DB
  checkMapSelection(mapSelection) : void {
      if(mapSelection != this.currentMap && mapSelection !== 'Bonus'){
          this.locationsReady = false;
          //Update wheel for new map selections
          this.currentMap = mapSelection;
          this.wheelSegments = [];

          this.locationApi.getMapLocations(mapSelection)
          .subscribe(response => {
              this.updateMapLocations(response);
              this.locationsReady = true;

              this.initWheel();
          }, error => {
              console.log(error);
          });
      }

      if(mapSelection === 'Bonus') {
          this.currentMap = 'Bonus';
         //TODO BONUS WHEEL
         this.initBonusWheel();
      }

      switch (this.currentMap) {
        case 'Miramar':
            $('body').css('background-image', 'url("./assets/desrt-map-1080.png")');
            break;
        case 'Sahnok':
            $('body').css('background-image', 'url("./assets/PUBG-Sanhok-map.jpg")');
            break;
        case 'Vikendi':
            $('body').css('background-image', 'url("./assets/vikendi.jpg")');
            break;
        case 'Bonus': break;
        default: $('body').css('background-image', 'url("./assets/pubg_map_down_scale.jpg")');
      }
  }

  updateMapLocations(locations) : void {
      this.locations1=[];
      this.locations2=[];
      this.locations3=[];
      locations.forEach(location => {
          if(location.level == 1) {
              this.locations1.push(location)
          }
          if(location.level == 2) {
              this.locations2.push(location)
          }
          if(location.level == 3) {
              this.locations3.push(location)
          }
      });


      this.currentMapLocations = {
          locations : this.locations1,
          locations2 : this.locations2,
          locations3 : this.locations3,
      };

      // Setting up default selections
      this.currentMapLocations.locations.forEach( location => {
          if(location['selected']) {
               location['fillStyle'] = '#1d5d1d';
          }
      });

      // Setting up default selections
      this.currentMapLocations.locations2.forEach( location => {
          if(location['selected']) {
               location['fillStyle'] = '#ea9904';
          }
      });

      this.currentMapLocations.locations3.forEach( location => {
          if(location['selected']) {
              location['fillStyle'] = '#e02626';
          }
      });
      // reset wheel options for new selections
      Object.keys(this.currentMapLocations).forEach(spiceLevel => {
          this.currentMapLocations[spiceLevel].forEach(option => {
              if(option.selected) {
                  this.wheelSegments.push(option);
              }
          })
      });
  }

  toggleSidebar() : void {
      this.showSidebar = !this.showSidebar;
  }

  toggleGreenScreen() : void {
      this.showGreenScreen = !this.showGreenScreen;
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

  addOption(option) :void {
      // If already selected, remove from selection
      if(!option.selected){
         this.wheelSegments = this.wheelSegments.filter(segment => segment['text'] !== option.text);
         option.selected = false;
      } else {
         option.selected = true;
         switch(option.level) {
             case 1: option.fillStyle = '#1d5d1d'; break;
             case 2: option.fillStyle = '#ea9904'; break;
             case 3: option.fillStyle = '#e02626'; break;
         }
         this.wheelSegments.push(option);
      }
      this.initWheel();
  }


  spin() : void {
    //   this.toggleLocationSelect = false;
      // Begin the spin animation by calling startAnimation on the wheel object.
      if(this.showBonus || this.currentMap === 'Bonus') {
          this.bonusWheel.startAnimation();
      } else {
          this.wheel.startAnimation();
      }
      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
  }

  announceLocation(showBonus?) : void {
      let winner;
      if(showBonus || this.currentMap === 'Bonus') {
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
          // Reporting the winner for SCIENCE
          // this.locationApi.reportWinner(winner._id).subscribe();
          swal({
              html: winner['winner_message'],
              title: winner.text + "!!!",
              confirmButtonText: 'The Wheel Provides',
            //   imageUrl: '/assets/gatka.png',
            //   imageWidth: 400,
            //   imageHeight: 200,
            //   imageAlt: 'Custom image',
              allowOutsideClick: false

          })
          .then(() => {
            //   this.wheelSegments=[];
              // reset wheel options for new selections
            //   Object.keys(this.currentMapLocations).forEach(spiceLevel => {
            //       this.currentMapLocations[spiceLevel].forEach(option => {
            //           if(option.selected) {
            //               this.wheelSegments.push(option);
            //           }
            //       })
            //   });

              if(this.showBonus) {
                  this.showBonus = false;
              }
            //   this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'});
            if(this.currentMap === 'Bonus'){
                this.initBonusWheel();
            } else {
                this.initWheel();
                this.wheel.draw();
            }
        });
      }
  }

  reset() : void {
      if(this.showBonus || this.currentMap === 'Bonus') {
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
    //   this.init = true;
    if(this.bonusWheel){
        this.bonusWheel.clearCanvas();
    }
      this.wheel = new Winwheel({
         'numSegments'       : this.wheelSegments.length,         // Specify number of segments.
         'outerRadius'       : 275,       // Set outer radius so wheel fits inside the background.
         'innerRadius' : 100,
         'drawMode'          : 'code',   // drawMode must be set to image.
         'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
         'textFontSize'      : 13,        // Set text options as desired.
         'textOrientation'   : 'horizontal',
        //  'textDirection'     : 'reversed',
         'textAlignment'     : 'outer',
         'textMargin'        : 5,
         'textFontFamily'    : 'Arial',
         // 'textStrokeStyle'   : 'black',
        //  'textLineWidth'     : 1,
         'textFillStyle'     : 'black',
         'fillStyle' : '#eadec4',
         'pointerAngle' : 90,
        //  'callbackFinished' : this.announceLocation,

         'segments' : this.wheelSegments,
         'animation' :                   // Specify the animation to use.
         {
             'type'     : 'spinToStop',
             'duration' : (Math.random()+1)*5,     // Duration in seconds.
             'spins'    : (Math.random()+2)*3,     // Number of complete spins.
             'callbackFinished' : () => {this.announceLocation()}
         },
        //  'pointerGuide' :        // Specify pointer guide properties.
        // {
        //     'display'     : true,
        //     'strokeStyle' : 'red',
        //     'lineWidth'   : 3
        // }
     });
  }

  initBonusWheel() : void {
      this.wheel.clearCanvas();
      this.bonusWheel = new Winwheel({
         'numSegments'       : this.bonus.length,         // Specify number of segments.
         'outerRadius'       : 275,       // Set outer radius so wheel fits inside the background.
         'innerRadius' : 100,
         'drawMode'          : 'code',   // drawMode must be set to image.
         'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
         'textFontSize'      : 13,        // Set text options as desired.
         'textOrientation'   : 'horizontal',
        //  'textDirection'     : 'reversed',
         'textAlignment'     : 'outer',
         'textMargin'        : 5,
         'textFontFamily'    : 'Arial',
         // 'textStrokeStyle'   : 'black',
        //  'textLineWidth'     : 1,
         'textFillStyle'     : 'black',
         'fillStyle' : '#99019a',
         'pointerAngle' : 90,
        //  'callbackFinished' : this.announceLocation,

         'segments' : this.bonus,
         'animation' :                   // Specify the animation to use.
         {
             'type'     : 'spinToStop',
             'duration' : (Math.random()+1)*5,     // Duration in seconds.
             'spins'    : (Math.random()+2)*3,     // Number of complete spins.
             'callbackFinished' : () => {this.announceLocation()}
         }
     });

     this.bonusWheel.draw();
  }
}
