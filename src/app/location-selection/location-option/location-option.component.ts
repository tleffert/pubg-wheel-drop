import { Input, Output, EventEmitter, Component, OnInit } from '@angular/core';

@Component({
  selector: 'location-option',
  templateUrl: './location-option.component.html'
})
export class LocationOption implements OnInit {

    @Input()
    locationLabel: string;

    @Input()
    selected: boolean;

    @Input()
    activeClass: string = 'active';

    @Input()
    inactiveClass: string = 'btn-secondary';

    @Output()
    selectedChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {}

    updateSelected() {
        this.selectedChange.emit();
    }
}
