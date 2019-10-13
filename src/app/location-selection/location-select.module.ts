import { NgModule } from '@angular/core';
import { LocationSelectComponent } from './location-select.component';
import { CommonModule } from '@angular/common';
import { LocationOption } from './location-option.component';
import { LocationGroupComponent } from './location-group/location-group.component';
import { LocationGroupToggle } from './location-group-toggle.directive';

@NgModule({
    imports : [CommonModule],
    declarations: [ LocationSelectComponent, LocationOption, LocationGroupComponent,
        LocationGroupToggle
    ],
    exports : [LocationSelectComponent, LocationOption, LocationGroupComponent, LocationGroupToggle]
})
export class LocationSelectModule { }
