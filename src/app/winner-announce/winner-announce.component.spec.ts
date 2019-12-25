import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerAnnounceComponent } from './winner-announce.component';

describe('WinnerAnnounceComponent', () => {
  let component: WinnerAnnounceComponent;
  let fixture: ComponentFixture<WinnerAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
