import { Input, Output, EventEmitter, Directive, Renderer2, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[location-option]',
  // templateUrl: './location-option.component.html',
})
export class LocationOption implements OnInit {

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

    private updateSelected() {
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
        if(this.selected) {
            this.setActiveClass();
        } else {
            this.setInactiveClass();
        }
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
