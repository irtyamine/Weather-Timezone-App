import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneProfileComponent } from './timezone-profile.component';

describe('TimezoneProfileComponent', () => {
  let component: TimezoneProfileComponent;
  let fixture: ComponentFixture<TimezoneProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezoneProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
