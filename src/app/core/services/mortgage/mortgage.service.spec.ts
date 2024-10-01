import { TestBed } from '@angular/core/testing';
import { MortgageService } from './mortgage.service';

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MortgageService],
    });
    service = TestBed.inject(MortgageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with correct values', () => {
    expect(service['borrowingAmount']()).toBe(826800);
    expect(service['purchasePrice']()).toBe(910000);
    expect(service['repaymentPeriod']()).toBe(30);
    expect(service['grossIncome']()).toBe(225000);
    expect(service['interestRate']()).toBe(3.65);
  });

  // it('should calculate monthly payment correctly', () => {
  //   const expectedMonthlyPayment = 4212.92; // Valor esperado de acordo com os parâmetros
  //   const monthlyPayment = service.monthlyPayment();
  //   expect(monthlyPayment).toBeCloseTo(expectedMonthlyPayment, 2);
  // });

  // it('should calculate debt to income correctly', () => {
  //   const expectedDebtToIncome = 4.50; // Valor esperado de acordo com os parâmetros
  //   const debtToIncome = service.debtToIncome();
  //   expect(debtToIncome).toBeCloseTo(expectedDebtToIncome, 2);
  // });

  // it('should calculate loan to value correctly', () => {
  //   const expectedLoanToValue = 89.9; // Valor esperado (loan to value ratio)
  //   const loanToValue = service.loanToValue();
  //   expect(loanToValue).toBeCloseTo(expectedLoanToValue, 1);
  // });

  it('should be reactive when borrowingAmount is updated', () => {
    service['borrowingAmount'].set(900000); // Alterando o valor do empréstimo
    const expectedLoanToValue = (900000 / 910000) * 100; // Recalculado

    expect(service.loanToValue()).toBeCloseTo(expectedLoanToValue, 1);
  });

  it('should be reactive when interestRate is updated', () => {
    service['interestRate'].set(4.0); // Alterando a taxa de juros
    const expectedMonthlyPayment = service['calculateMonthlyPayment'](); // Recalcula

    expect(service.monthlyPayment()).toBeCloseTo(expectedMonthlyPayment, 2);
  });

  it('should calculate monthly payment correctly when interest rate is 0%', () => {
    // Configura a taxa de juros para 0%
    service['interestRate'].set(0);

    const principal = 826800; // Valor do empréstimo
    const repaymentPeriod = 30; // Período de pagamento em anos
    const expectedMonthlyPayment = principal / (repaymentPeriod * 12); // Pagamento mensal sem juros

    const monthlyPayment = service.monthlyPayment();

    expect(monthlyPayment).toBeCloseTo(expectedMonthlyPayment, 2);
  });


  it('should update debtToIncome when grossIncome is changed', () => {
    service['grossIncome'].set(300000); // Alterando a renda bruta
    const expectedDebtToIncome = (service.monthlyPayment() * 12) / 300000;

    expect(service.debtToIncome()).toBeCloseTo(expectedDebtToIncome, 2);
  });

  it('should update termYears when repaymentPeriod is changed', () => {
    service['repaymentPeriod'].set(20); // Alterando o período de pagamento
    expect(service.termYears()).toBe(20);
  });
});
