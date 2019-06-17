import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectComponent } from './map-select.component';

describe('MapSelectComponent', () => {
  let component: MapSelectComponent;
  let fixture: ComponentFixture<MapSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
