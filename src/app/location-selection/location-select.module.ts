import { NgModule } from '@angular/core';
import { LocationSelectComponent } from './location-select.component';
import { CommonModule } from '@angular/common';
import { LocationOption } from './location-option.component';
import { LocationGroupComponent } from './location-group/location-group.component';
import { LocationGroupToggle } from './location-group-toggle.directive';
import { LocationOptionTemplateDirective} from './location-group/location-option-template.directive';

@NgModule({
    imports : [CommonModule],
    declarations: [ LocationSelectComponent, LocationOption, LocationGroupComponent,
        LocationGroupToggle, LocationOptionTemplateDirective
    ],
    exports : [LocationSelectComponent, LocationOption, LocationGroupComponent, LocationGroupToggle, LocationOptionTemplateDirective]
})
export class LocationSelectModule { }
