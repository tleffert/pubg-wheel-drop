import { LocationEntity } from '@app/store';

export interface WheelSegment {
    /** Location object from the state store */
    location: LocationEntity,

/* ==== Below are defined from http://dougtesting.net/winwheel/refs/class_segment ===
    Because of how the wheel works we need append our custom properties to the base
    as the unexpected properties are preserved
*/
    /** valid html5 fills */
    fillStyle: string,
    /** Text displayed over the segment */
    text: string,
    /** Size of segment in degrees of arc 0-360 */
    size?: number,
    /** html stroke style */
    strokeStyle?: string,
    lineWidth?: number,
    textFontFamily?: string,
    textFontSize?: number,
    textFontWeight?: string | number,
    /** horizontal, vertical, curved */
    textOrientation?: string,
    /** inner, outter, center */
    textAlignment?: string,
    /** normal or reversed */
    textDirection?: string,
    textMargin?: number,
    textFillStyle?: string,
    textLineWidth?: number,
    /** path to image */
    image?: string,
    /** N, S, E, W cardinal directions */
    imageDirection?: string,
    /** data used for images within WinWheel API */
    imgData?: any
}
