import { Input, Output, EventEmitter, Directive, Renderer2, ElementRef, HostListener, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[location-option]',
  // templateUrl: './location-option.component.html',
})
export class LocationOption implements OnInit, OnChanges {

    @HostListener('click', ['$event']) onClick($event){
        this.updateSelected();
    }

    @Input()
    selected: boolean;

    @Input()
    activeClass: string;

    @Input()
    inactiveClass: string;

    @Output()
    selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    label: string

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        if(this.selected) {
            this.setActiveClass();
        } else {
            this.setInactiveClass();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.selected) {
            this.selected = changes.selected.currentValue
            this.updateClass();
        }
    }

    private updateClass() {
        if(this.selected) {
            this.setActiveClass();
        } else {
            this.setInactiveClass();
        }
    }

    private updateSelected() {
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
        this.updateClass();
    }

    private setActiveClass() {
        this.renderer.removeClass(this.elementRef.nativeElement, this.inactiveClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.activeClass);
    }

    private setInactiveClass() {
        this.renderer.removeClass(this.elementRef.nativeElement, this.activeClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.inactiveClass);
    }

}
