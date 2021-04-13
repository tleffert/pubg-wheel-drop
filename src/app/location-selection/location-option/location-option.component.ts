import { Input, Output, EventEmitter, Component, Renderer2, ElementRef, HostListener, OnInit, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

import { Location } from '@app/types';

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

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {}

    updateSelected() {
        this.selectedChange.emit();
    }
}
