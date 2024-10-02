import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from '../../services/loader';
import { MortgageService } from '../../services/mortgage';
import { CardCalculationComponent } from './card-calculation.component';

describe('CardCalculationComponent', () => {
  let component: CardCalculationComponent;
  let fixture: ComponentFixture<CardCalculationComponent>;
  let loaderService: LoaderService;
  let mortgageService: MortgageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCalculationComponent],
      providers: [
        {
          provide: LoaderService,
          useValue: {
            getIsLoading: () => signal(false),
          },
        },
        {
          provide: MortgageService,
          useValue: {
            monthlyPayment: () => 1000,
            debtToIncome: () => 0.35,
            loanToValue: () => 0.8,
            termYears: () => 30,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCalculationComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    mortgageService = TestBed.inject(MortgageService);
    fixture.componentRef.setInput('blurValue', signal(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display monthly payment correctly when not loading', () => {
    loaderService.getIsLoading = () => signal(false); 
    fixture.detectChanges();

    const monthlyPaymentElement = fixture.nativeElement.querySelector('.relative.flex > p');
    expect(monthlyPaymentElement.textContent.trim()).toContain('1,000.00');
});

  it('should display debt to income ratio correctly when not loading', () => {
    fixture.detectChanges(); 

    const debtToIncomeElement = fixture.nativeElement.querySelector('.card__calculation--info:nth-child(1) p');
    expect(debtToIncomeElement.textContent.trim()).toContain('3.5x');
  });

  it('should display loan to value ratio correctly when not loading', () => {
    fixture.detectChanges(); 

    const loanToValueElement = fixture.nativeElement.querySelector('.card__calculation--info:nth-child(2) p');
    expect(loanToValueElement.textContent.trim()).toContain('80.00%');
  });

  it('should display term years correctly when not loading', () => {
    fixture.detectChanges(); 

    const termYearsElement = fixture.nativeElement.querySelector('.card__calculation--info:nth-child(3) p');
    expect(termYearsElement.textContent.trim()).toBe('30');
  });
});
