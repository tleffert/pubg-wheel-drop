export class Location {
    text : string; // Name of the location (currently matching text property for the wheel)
    level : number; // spice level
    map : string; // map
    winner_message : string;
    location_img : string; // Name of file not path to, as image should be within assets
    selected : boolean; // If the location is apart of the default selection
    weighting : number;
}
