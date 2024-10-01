import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCalculationComponent } from './card-calculation.component';

describe('CardCalculationComponent', () => {
  let component: CardCalculationComponent;
  let fixture: ComponentFixture<CardCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCalculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
