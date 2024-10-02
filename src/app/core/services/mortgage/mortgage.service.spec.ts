import { TestBed } from '@angular/core/testing';
import { Mortgage } from 'src/app/core/interfaces/mortgage.interface';

import { MortgageService } from 'src/app/core/services/mortgage';

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate monthly payment correctly with non-zero interest rate', () => {
    const expectedPayment =  3782.2756492622234;
    expect(service.monthlyPayment()).toBeCloseTo(expectedPayment, 2); 
  });

  it('should calculate monthly payment correctly with zero interest rate', () => {
    service.setValues({
      borrowingAmount: 100000,
      purchasePrice: 100000,
      repaymentPeriod: 30,
      grossIncome: 50000,
      interestRate: 0,
    });
    expect(service.monthlyPayment()).toBe(277.77777777777777);
  });

  it('should calculate debt-to-income ratio correctly', () => {
    const expectedRatio = 0.20172136796065193; 
    expect(service.debtToIncome()).toBeCloseTo(expectedRatio, 4);
  });

  it('should calculate loan-to-value ratio correctly', () => {
    const expectedLTV = 0.91; 
    expect(service.loanToValue()).toBeCloseTo(expectedLTV, 2);
  });

  it('should set values correctly', () => {
    const mortgage: Mortgage = {
      borrowingAmount: 100000,
      purchasePrice: 150000,
      repaymentPeriod: 20,
      grossIncome: 60000,
      interestRate: 4.5,
    };

    service.setValues(mortgage);

    expect(service['borrowingAmount']()).toBe(mortgage.borrowingAmount);
    expect(service['purchasePrice']()).toBe(mortgage.purchasePrice);
    expect(service['repaymentPeriod']()).toBe(mortgage.repaymentPeriod);
    expect(service['grossIncome']()).toBe(mortgage.grossIncome);
    expect(service['interestRate']()).toBe(mortgage.interestRate);
  });

  it('should calculate loan-to-value ratio correctly when either loan amount or purchase price is zero', () => {
    service.setValues({
      borrowingAmount: 0,
      purchasePrice: 100000,
      repaymentPeriod: 30,
      grossIncome: 50000,
      interestRate: 3.65,
    });
    expect(service.loanToValue()).toBe(0);

    service.setValues({
      borrowingAmount: 100000,
      purchasePrice: 0, 
      repaymentPeriod: 30,
      grossIncome: 50000,
      interestRate: 3.65,
    });
    expect(service.loanToValue()).toBe(0); 
    
    service.setValues({
      borrowingAmount: 100000,
      purchasePrice: 10000, 
      repaymentPeriod: 30,
      grossIncome: 0,
      interestRate: 3.65,
    });
    expect(service.debtToIncome()).toBe(0); 
  });
});
