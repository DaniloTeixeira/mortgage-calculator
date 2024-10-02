import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { provideEnvironmentNgxMask } from 'ngx-mask';

import { CardInputsComponent } from 'src/app/core/components/card-inputs';
import { LoaderService } from 'src/app/core/services/loader';
import { MortgageService } from 'src/app/core/services/mortgage';

describe('CardInputsComponent', () => {
  let component: CardInputsComponent;
  let fixture: ComponentFixture<CardInputsComponent>;
  let loaderService: LoaderService;
  let mortgageService: MortgageService;

  beforeEach(async () => {
    jest.useFakeTimers(); 
    
    await TestBed.configureTestingModule({
      imports: [CardInputsComponent],
      providers: [
        provideEnvironmentNgxMask(),
        FormBuilder,
        {
          provide: LoaderService,
          useValue: {
            setIsLoading: jest.fn(),
            getIsLoading: () => signal(false),
            isLoading: jest.fn().mockReturnValue(signal(false)), 
          },
        },
        {
          provide: MortgageService,
          useValue: {
            setValues: jest.fn(),
              monthlyPayment: () => 1000,
              debtToIncome: () => 0.35,
              loanToValue: () => 0.8,
              termYears: () => 30,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    
    fixture = TestBed.createComponent(CardInputsComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    mortgageService = TestBed.inject(MortgageService);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set mortgage values when form is valid', () => {
    component.form.controls.borrowingAmount.setValue(100000);
    component.form.controls.purchasePrice.setValue(200000);
    component.form.controls.repaymentPeriod.setValue(30);
    component.form.controls.grossIncome.setValue(50000);
    component.form.controls.interestRate.setValue(3.5);

    component.form.markAsDirty();

    component.form.valueChanges.subscribe(() => {
      expect(mortgageService.setValues).toHaveBeenCalledWith(expect.objectContaining({
        borrowingAmount: 100000,
        purchasePrice: 200000,
        repaymentPeriod: 30,
        grossIncome: 50000,
        interestRate: 3.5,
      }));
    });

    component.form.updateValueAndValidity();
  });

  it('should call setIsLoading when form changes', () => {
    component.form.controls.borrowingAmount.setValue(100000);
    component.form.controls.purchasePrice.setValue(200000);
    component.form.controls.repaymentPeriod.setValue(30);
    component.form.controls.grossIncome.setValue(50000);
    component.form.controls.interestRate.setValue(3.5);

    component.form.markAsDirty();

    component.form.valueChanges.subscribe(() => {
      expect(loaderService.setIsLoading).toHaveBeenCalledWith(true);
    });

    component.form.updateValueAndValidity();
  });

  it('should not call setValues when form is invalid', () => {
    component.form.controls.borrowingAmount.setValue(null);
    component.form.updateValueAndValidity();
  
    component.form.valueChanges.subscribe(() => {
      expect(mortgageService.setValues).not.toHaveBeenCalled();
    });
  });
  
  it('should set preferred repayment period', () => {
    const period = 20;
    component.setpreferredRepaymentPeriod(period);
    expect(component.form.controls.repaymentPeriod.value).toBe(period);
  });
  
  it('should show error message when form is invalid', () => {
    component.form.controls.borrowingAmount.setValue(null);
    fixture.detectChanges();
  
    const errorMessageElement = fixture.nativeElement.querySelector('.text-red-500');
    expect(errorMessageElement).toBeTruthy();
  });

  it('should call mortgageService.setValues with correct values when form is valid', () => {
    const formValues = {
      borrowingAmount: 100000,
      purchasePrice: 200000,
      repaymentPeriod: 30,
      grossIncome: 50000,
      interestRate: 3.5,
    };
  
    component.form.controls.borrowingAmount.setValue(formValues.borrowingAmount);
    component.form.controls.purchasePrice.setValue(formValues.purchasePrice);
    component.form.controls.repaymentPeriod.setValue(formValues.repaymentPeriod);
    component.form.controls.grossIncome.setValue(formValues.grossIncome);
    component.form.controls.interestRate.setValue(formValues.interestRate);
  
    component.form.markAsDirty(); 
    component.form.updateValueAndValidity();
  
    component['setMortgageValues']();
  
    expect(mortgageService.setValues).toHaveBeenCalledWith(expect.objectContaining(formValues));
  });
  

  it('should set shouldBlurCaculationValues to false after the timer completes', (done) => {
    component['loadCalculation']();

    jest.advanceTimersByTime(1000);

    expect(component.shouldBlurCaculationValues).toBe(false);
    done();
  });
  
  it('should not call setMortgageValues when form values have not changed', fakeAsync(() => {
    const setValuesSpy = jest.spyOn(mortgageService, 'setValues');
  
    component.form.controls.borrowingAmount.setValue(100000);
    component.form.controls.purchasePrice.setValue(200000);
    component.form.controls.repaymentPeriod.setValue(30);
    component.form.controls.grossIncome.setValue(50000);
    component.form.controls.interestRate.setValue(3.5);
  
    component.form.markAsDirty();
    component.form.updateValueAndValidity();
  
    tick(500);
    tick(1000);
  
    expect(setValuesSpy).toHaveBeenCalledWith(expect.objectContaining({
      borrowingAmount: 100000,
      purchasePrice: 200000,
      repaymentPeriod: 30,
      grossIncome: 50000,
      interestRate: 3.5,
    }));
  
    component.form.controls.borrowingAmount.setValue(100000);
    component.form.controls.purchasePrice.setValue(200000);
    component.form.controls.repaymentPeriod.setValue(30);
    component.form.controls.grossIncome.setValue(50000);
    component.form.controls.interestRate.setValue(3.5);
    component.form.updateValueAndValidity();
  
    tick(500);
    tick(1000);
  
    expect(setValuesSpy).toHaveBeenCalledTimes(1);
  }));
});
  
