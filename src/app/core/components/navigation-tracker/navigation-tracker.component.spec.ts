import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavigationTrackerComponent } from 'src/app/core/components/navigation-tracker';

describe('NavigationTrackerComponent', () => {
  let component: NavigationTrackerComponent;
  let fixture: ComponentFixture<NavigationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationTrackerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct default values', () => {
    expect(component.selectedNavigationItem).toBe(2);
    expect(component.navigationTrackerItems.length).toBe(8);
  });

  it('should update selectedNavigationItem when an item is clicked', () => {
    const firstItem = fixture.debugElement.queryAll(By.css('.nav-tracker__item'))[0];
    firstItem.triggerEventHandler('click', null);
    
    expect(component.selectedNavigationItem).toBe(0);
  });

  it('should apply the correct class based on selectedNavigationItem', () => {
    const firstItem = fixture.debugElement.queryAll(By.css('.nav-tracker__item'))[0];
    firstItem.triggerEventHandler('click', null);
    fixture.detectChanges();

    const activeItem = fixture.debugElement.query(By.css('.nav-tracker__item--active'));
    expect(activeItem).toBeTruthy();

    const secondItem = fixture.debugElement.queryAll(By.css('.nav-tracker__item'))[1];
    secondItem.triggerEventHandler('click', null);
    fixture.detectChanges();

    const activeItemAfterClick = fixture.debugElement.query(By.css('.nav-tracker__item--active'));
    expect(activeItemAfterClick).toBeTruthy();
});


  it('should render the correct number of navigation items', () => {
    const items = fixture.debugElement.queryAll(By.css('.nav-tracker__item'));
    expect(items.length).toBe(8);
  });
});
