import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocationApiService } from '../location-api.service';

import swal from 'sweetalert2/dist/sweetalert2.all.min.js'
declare var $: any;

let Winwheel = require('winwheel')
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
    private locations1 : object[];
    private locations2 : object[];
    private locations3 : object[];
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

  constructor(private locationApi : LocationApiService) {this.wheelPower = 2;}

  ngOnInit() {

      this.showBonus = false;
      this.toggleLocationSelect = true;
      this.init = true;
      this.wheelSegments = [];
      this.currentMap = "erangel";
      this.erangel = {};
      this.miramar = {};




      this.bonus = [
          {text : 'Pooper Scooper'},
          {text : 'Red Pin Wins'},
          {text : 'Example1'},
          {text : 'Example2'},
          {text : 'Example3'},
          {text : 'Example4'}

      ]
      this.locationApi.listByMap('Erangel')
      .subscribe(response => {
          this.updateMapLocations(response);
          this.locationsReady = true;

          this.initWheel();
      }, error => {
          console.log(error);
      });

    //   this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'})

     this.initWheel();
     this.wheel.draw();
     this.locationsReady = true;
     this.ready = true;
  }

  // Updates the Location selection from the DB
  checkMapSelection(mapSelection) : void {
      if(mapSelection != this.currentMap){
          this.locationsReady = false;
          //Update wheel for new map selections
          this.currentMap = mapSelection;
          this.wheelSegments = [];
          if(mapSelection == 'miramar') {
              $('body').css('background-image', 'url("./assets/desrt-map-1080.png")');
              this.locationApi.listByMap('Miramar')
              .subscribe(response => {
                  this.updateMapLocations(response);
                  console.log(this.wheelSegments);
                  this.locationsReady = true;
                  this.initWheel();

              }, error => {
                  console.log(error);

              });
          } else {
              $('body').css('background-image', 'url("./assets/pubg_map_down_scale.jpg")');
              this.locationApi.listByMap('Erangel')
              .subscribe(response => {
                  this.updateMapLocations(response);
                  this.locationsReady = true;

                  this.initWheel();
              }, error => {
                  console.log(error);
              });
          }
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

      console.log("THESE ARE THE NEW SELECTS", this.currentMapLocations);
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
        switch(option.spice) {
            case 1: option.fillStyle = '#1d5d1d'; break;
            case 2: option.fillStyle = '#ea9904'; break;
            case 3: option.fillStyle = '#e02626'; break;
        }
     })
     this.wheelSegments = this.wheelSegments.concat(options);
     this.initWheel();
  }

  addOption(option) :void {
      console.log(option);
      // If already selected, remove from selection
      if(option.selected){
         this.wheelSegments = this.wheelSegments.filter(segment => segment['text'] !== option.text);
         option.selected = false;
      } else {
         option.selected = true;
         switch(option.spice) {
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
      if(this.showBonus) {
          this.bonusWheel.startAnimation();
      } else {
          this.wheel.startAnimation();
      }
      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
  }

  announceLocation(showBonus?) : void {
      console.log("SHOULD i SHOW THE BONUS", showBonus)
      let winner;
      if(showBonus) {
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
          this.locationApi.reportWinner(winner._id).subscribe();
          swal({
              title: winner['winner_message'],
              text: winner.text + "!!!",
              confirmButtonText: 'The Wheel Provides',
            //   imageUrl: '/assets/gatka.png',
            //   imageWidth: 400,
            //   imageHeight: 200,
            //   imageAlt: 'Custom image',
              allowOutsideClick: false

          })
          .then(() => {
              this.wheelSegments=[];
              // reset wheel options for new selections
              Object.keys(this.currentMapLocations).forEach(spiceLevel => {
                  this.currentMapLocations[spiceLevel].forEach(option => {
                      if(option.selected) {
                          this.wheelSegments.push(option);
                      }
                  })
              });

              if(this.showBonus) {
                  this.showBonus = false;
              }
            //   this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'});
              this.initWheel();
              this.wheel.draw();
          })
      }
  }

  reset() : void {
      if(this.showBonus) {
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
      console.log(this.wheelSegments);
    //   this.init = true;
      this.wheel = new Winwheel({
         'numSegments'       : this.wheelSegments.length,         // Specify number of segments.
         'outerRadius'       : 250,       // Set outer radius so wheel fits inside the background.
         'innerRadius' : 100,
         'drawMode'          : 'code',   // drawMode must be set to image.
         'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
         'textFontSize'      : 16,        // Set text options as desired.
         'textOrientation'   : 'horizontal',
        //  'textDirection'     : 'reversed',
         'textAlignment'     : 'outer',
         'textMargin'        : 5,
         'textFontFamily'    : 'Courier',
         'textStrokeStyle'   : 'black',
        //  'textLineWidth'     : 1,
         'textFillStyle'     : 'black',
         'fillStyle' : '#eadec4',
         'pointerAngle' : 90,
        //  'callbackFinished' : this.announceLocation,

         'segments' : this.wheelSegments,
         'animation' :                   // Specify the animation to use.
         {
             'type'     : 'spinToStop',
             'duration' : 5,     // Duration in seconds.
             'spins'    : 8,     // Number of complete spins.
             'callbackFinished' : () => {this.announceLocation()}
         }
     });
  }

  initBonusWheel() : void {
      this.bonusWheel = new Winwheel({
         'numSegments'       : this.bonus.length,         // Specify number of segments.
         'outerRadius'       : 250,       // Set outer radius so wheel fits inside the background.
         'innerRadius' : 100,
         'drawMode'          : 'code',   // drawMode must be set to image.
         'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
         'textFontSize'      : 14,        // Set text options as desired.
         'textOrientation'   : 'horizontal',
        //  'textDirection'     : 'reversed',
         'textAlignment'     : 'outer',
         'textMargin'        : 5,
         'textFontFamily'    : 'Courier',
         'textStrokeStyle'   : 'black',
        //  'textLineWidth'     : 1,
         'textFillStyle'     : 'black',
         'fillStyle' : '#eadec4',
         'pointerAngle' : 90,
        //  'callbackFinished' : this.announceLocation,

         'segments' : this.bonus,
         'animation' :                   // Specify the animation to use.
         {
             'type'     : 'spinToStop',
             'duration' : 5,     // Duration in seconds.
             'spins'    : 8,     // Number of complete spins.
             'callbackFinished' : () => { this.announceLocation(true)}
         }
     });

     this.bonusWheel.draw();
  }
}
