import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGroupComponent } from './location-group.component';

describe('LocationGroupComponent', () => {
  let component: LocationGroupComponent;
  let fixture: ComponentFixture<LocationGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
