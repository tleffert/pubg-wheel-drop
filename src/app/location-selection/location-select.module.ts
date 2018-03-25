import { NgModule } from '@angular/core';
import { LocationSelectComponent } from './location-select.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports : [CommonModule],
    declarations: [ LocationSelectComponent ],
    exports : [LocationSelectComponent]
})
export class LocationSelectModule { }
