import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamStatusComponent } from './steam-status.component';

describe('SteamStatusComponent', () => {
  let component: SteamStatusComponent;
  let fixture: ComponentFixture<SteamStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
