interface wheelAnimationConfig {
    type: string,
    duration: number // Duration in seconds.
    spins: number   // Number of complete spins.
    callbackFinished: Function // I tink
}

export interface WheelConfig {
    numSegments: number; // Specify number of segments.
    outerRadius: number; // Set outer radius so wheel fits inside the background.
    innerRadius: number;
    drawMode: string;
    drawText : boolean;      // Need to set this true if want code-drawn text on image wheels.
    textFontSize: number;        // Set text options as desired.
    textOrientation: string;
    textDirection: string;
    textAlignment: string;
    textMargin: number;
    textFontFamily: string;
    textStrokeStyle: string;
    textLineWidth: number;
    textFillStyle: string;
    fillStyle: string;
    pointerAngle : number; //degrees
    segments: any[]; //Array of wheel segments
    animation: wheelAnimationConfig; // Specify the animation to use.
}

export const wheelConfigDefaultConf: WheelConfig = {
    numSegments: 0,         // Specify number of segments.
    outerRadius: 275,       // Set outer radius so wheel fits inside the background.
    innerRadius: 100,
    drawMode: 'code',   // drawMode must be set to image.
    drawText: true,      // Need to set this true if want code-drawn text on image wheels.
    textFontSize: 13,        // Set text options as desired.
    textOrientation: 'horizontal',
    textDirection: 'normal',
    textAlignment: 'outer',
    textMargin: 5,
    textFontFamily: 'Arial',
    textStrokeStyle: null,
    textLineWidth: 1,
    textFillStyle: 'black',
    fillStyle: '#eadec4',
    pointerAngle: 90,
    segments : [],
    animation :                   // Specify the animation to use.
    {
        type     : 'spinToStop',
        duration : 0,     // Duration in seconds.
        spins    : 7,     // Number of complete spins.
        callbackFinished : null
    },
}
