import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

    private locations : object[];
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

  constructor() { this.wheelPower = 2;}

  ngOnInit() {
      this.showBonus = false;
      this.toggleLocationSelect = true;
      this.init = true;
      this.wheelSegments = [];
      this.currentMap = "erangel";
      this.erangel = {};
      this.miramar = {};

      this.erangel.locations = [
          {text : 'Sunken City', spice : 1},
          {text : 'Gatka Radio', spice : 1},
          {text : 'Hospital', spice : 1},
          {text : 'Farm', spice : 1},
          {text : 'Quarry', spice : 1},
          {text : 'East Bridge', spice : 1},
          {text : 'West Bridge', spice : 1},
          {text : 'Swamp', spice : 1}
      ];

      this.erangel.locations2 = [
          {text : 'Novo', spice : 2, selected : true},
          {text : 'Primorsk', spice : 2},
          {text : 'Mylta Power', spice : 2, selected : true},
          {text : 'Mylta', spice : 2},
          {text : 'Kameshki', spice : 2},
          {text : 'Prison', spice : 2},
          {text : 'Gatka', spice : 2},
          {text : 'Zharki', spice : 2, selected : true},
          {text : 'Stalber', spice : 2},
          {text : 'Mansion', spice : 2, selected : true},
          {text : 'Gun Range', spice : 2},
      ];

      this.erangel.locations3 = [

          {text : 'Military' , spice : 3, selected : true},
          {text : 'School', spice : 3},
          {text : 'Pochinki', spice : 3},
          {text : 'Polyana', spice : 3},
          {text : 'Georgopol', spice :3, selected : true},
          {text : 'Rozhok', spice : 3, selected : true},
          {text : 'Shelter', spice : 3, selected : true},
          {text : 'Severny', spice : 3, selected : true},
          {text : 'Lipovka', spice : 3, selected : true},

      ];

      this.miramar.locations = [
          {text : 'Islands (SE)', spice : 1},
          {text : 'Power Grid', spice : 1},
          {text : 'Water Treatment', spice : 1},
          {text : 'Tierra Bronca', spice : 1},
          {text : 'Cruz Del Valle', spice : 1},
          {text : 'Graveyard', spice : 1},
          {text : 'Minas Generales', spice : 1},
          {text : 'Junkyard', spice : 1},
          {text : 'Minas Del Valle', spice : 1},

      ];

      this.miramar.locations2 = [
          {text : 'Cobreria', spice : 2, selected : true},
          {text : 'Chumacera', spice : 2},
          {text : 'Pecado', spice : 2, selected : true},
          {text : 'San Martin', spice : 2},
          {text : 'Impala', spice : 2},
          {text : 'La Bendita', spice : 2},
          {text : 'Monte Nuevo', spice : 2},
          {text : 'El Azahar', spice : 2, selected : true},
          {text : 'Torre Ahumada', spice : 2},
          {text : 'Velle Del Mar', spice : 2},
          {text : 'Minas Del Sur', spice : 2},
          {text : 'Los Higos', spice : 2},

      ];

      this.miramar.locations3 = [

          {text : 'Leones' , spice : 3, selected : true},
          {text : 'El Pozo', spice : 3},
          {text : 'Campo Militar', spice : 3},
          {text : 'Prison', spice : 3},
          {text : 'Hacienda', spice : 3, selected : true},

      ];


      this.bonus = [
          {text : 'Pooper Scooper'},
          {text : 'Red Pin Wins'},
          {text : 'Example1'},
          {text : 'Example2'},
          {text : 'Example3'},
          {text : 'Example4'}

      ]

      this.currentMapLocations = {
          locations : this.erangel.locations,
          locations2 : this.erangel.locations2,
          locations3 : this.erangel.locations3,
      };

      // Setting up default selections
      this.currentMapLocations.locations2.forEach( location => {
          if(location['selected']) {
               location['fillStyle'] = '#ea9904';
              this.wheelSegments.push(location);
          }
      });

      this.currentMapLocations.locations3.forEach( location => {
          if(location['selected']) {
              location['fillStyle'] = '#e02626';
              this.wheelSegments.push(location);
          }
      });
    //   this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'})

     this.initWheel();
     this.wheel.draw();
     this.ready = true;
  }

  checkMapSelection(mapSelection) : void {
      if(mapSelection != this.currentMap){
          this.wheelSegments = [];
          if(mapSelection == 'miramar') {
              $('body').css('background-image', 'url("./assets/desrt-map-1080.png")');
          } else {
              $('body').css('background-image', 'url("./assets/pubg_map_down_scale.jpg")');

          }
          //Update wheel for new map selections
          this.currentMap = mapSelection;
          this.currentMapLocations = {
              locations : this[mapSelection].locations,
              locations2 : this[mapSelection].locations2,
              locations3 : this[mapSelection].locations3,
          };

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


        //   this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'});
          //resest and redraw wheel
          this.initWheel();
        //   this.wheel.draw();
      }
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
      console.log("THIS IS THE WINNER ============", winner.text, winner);
      if(winner.text === 'Bonus') {
          this.showBonus = true;
          console.log("BONUS WHEEL TIME");
        swal({
            text : "ITS BONUS TIME, GIVE THE BONUS WHEEL A SPIN",
            allowOutsideClick: false
        });
        this.initBonusWheel();

      } else {
          swal({
              title: 'You\'re going to Sunny .... ',
              text: winner.text + "!!!",
              type: 'info',
              confirmButtonText: 'The Wheel Provides',
              imageUrl: '/assets/gatka.png',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
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
              this.wheelSegments.push({text : 'Bonus', selected : true,  fillStyle : '#a67c00'});
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
