import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneListComponent } from './timezone-list.component';

describe('TimezoneListComponent', () => {
  let component: TimezoneListComponent;
  let fixture: ComponentFixture<TimezoneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezoneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
