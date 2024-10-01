import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTrackerComponent } from './navigation-tracker.component';

describe('NavigationTrackerComponent', () => {
  let component: NavigationTrackerComponent;
  let fixture: ComponentFixture<NavigationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
