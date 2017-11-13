import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js'

let Winwheel = require('winwheel')
// declare var Winwheel: any;
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent implements OnInit {
    private wheel : any;
    private wheelSegments : object[];
    private wheelSpinning : boolean;
    private wheelPower : number;
    private locations1 : object[];
    private locations2 : object[];

    private locations3 : object[];

    private ready : boolean;

    private init : boolean;

  constructor() { this.wheelPower = 2;}

  ngOnInit() {
      this.init = true;
      this.wheelSegments = [];

      this.locations1 = [
          {text : 'Sunken City', spice : 1},
          {text : 'Gatka Radio', spice : 1},
          {text : 'Hospital', spice : 1},
          {text : 'Farm', spice : 1},
          {text : 'Quary', spice : 1},
          {text : 'East Bridge', spice : 1},
          {text : 'West Bridge', spice : 1},
          {text : 'Swamp', spice : 1},


      ]
      this.locations2 = [
          {text : 'Lipovka', spice : 2},
          {text : 'Novo', spice : 2},
          {text : 'Primorsk', spice : 2},
          {text : 'Mylta Power', spice : 2},
          {text : 'Mylta', spice : 2},
          {text : 'Kameshki', spice : 2},
          {text : 'Prison', spice : 2},
          {text : 'Gatka', spice : 2},
          {text : 'Zharki', spice : 2},
          {text : 'Stalber', spice : 2},
          {text : 'Mansion', spice : 2},
          {text : 'Gun Range', spice : 2},


      ]
      this.locations3 = [

          {text : 'Military' , spice : 3},
          {text : 'School', spice : 3},
          {text : 'Pochinki', spice : 3},
          {text : 'Polyana', spice : 3},
          {text : 'Georgopol', spice :3},
          {text : 'Rozhok', spice : 3},
          {text : 'Shelter', spice : 3},


      ]

    //  this.initWheel([{text:"\'Round and \'Round it goes, where it'll stop nobody knows"}]);
    //  this.wheel.draw();
     this.ready = true;
  }

  addOptions(options) : void {
      console.log(options)
      options.forEach(option => {
        option.selected = true;
        switch(option.spice) {
            case 1: option.fillStyle = '#1d5d1d'; break;
            case 2: option.fillStyle = '#ea9904'; break;
            case 3: option.fillStyle = '#e02626'; break;
        }
     })
     this.wheelSegments = this.wheelSegments.concat(options);
     console.log(this.wheelSegments);
     this.initWheel();
  }

  addOption(option) :void {
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
      // Begin the spin animation by calling startAnimation on the wheel object.
      this.wheel.startAnimation();
      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
  }

  announceLocation(winningLocation?) : void {
      let winner = this.wheel.getIndicatedSegment();
      console.log("THIS IS THE WINNER", winner.text, winner);

      swal({
          title: 'You\'re going to Sunny .... ',
          text: winner.text + "!!!",
          type: 'info',
          confirmButtonText: 'The Wheel Provides',
          imageUrl: '/assets/gatka.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
      });


  }


  reset() : void {
      this.wheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
      this.wheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
      this.wheel.draw();                // Call draw to render changes to the wheel.
      this.wheelSpinning = false;
  }

  initWheel(initText?) : void {
    //   this.init = true;
      this.wheel = new Winwheel({
         'numSegments'       : this.wheelSegments.length || 1,         // Specify number of segments.
         'outerRadius'       : 200,       // Set outer radius so wheel fits inside the background.
         'innerRadius' : 75,
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

         'segments' : initText || this.wheelSegments,
         'animation' :                   // Specify the animation to use.
         {
             'type'     : 'spinToStop',
             'duration' : 5,     // Duration in seconds.
             'spins'    : 8,     // Number of complete spins.
             'callbackFinished' : () => {this.announceLocation('sfdsf')}
         }
     });
  }

}
