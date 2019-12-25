import { Input, Output, EventEmitter, Directive, TemplateRef, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[location-group-toggle]'
  // templateUrl: './location-option.component.html',
})
export class LocationGroupToggle {

    @HostListener('click', ['$event']) onClick(){
        this.selectedChange.emit({
            group: this.groupId,
            selected: this.selected
        });
    }

    @Input()
    groupId: string;

    @Input()
    selected: boolean;

    @Output()
    selectedChange: EventEmitter<{group: string, selected: boolean}> = new EventEmitter<{group: string, selected: boolean}>();

}
