import { Injectable, computed, signal } from '@angular/core';

import { Mortgage } from '@interfaces/mortgage.interface';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  private borrowingAmount = signal(826800);
  private purchasePrice = signal(910000);
  private repaymentPeriod = signal(30);
  private grossIncome = signal(225000);
  private interestRate = signal(3.65);

  public readonly termYears = computed(() => this.repaymentPeriod());
  public readonly loanToValue = computed(() => this.calculateLoanToValue());
  public readonly debtToIncome = computed(() => this.calculateDebtToIncome());
  public readonly monthlyPayment = computed(() => this.calculateMonthlyPayment());

  private calculateMonthlyPayment(): number {
    const principal = this.borrowingAmount();
    const interestRate = this.interestRate() / 100 / 12;
    const numberOfPayments = this.repaymentPeriod() * 12;

    if (interestRate === 0) {
      return principal / numberOfPayments;
    }

    return (
      (principal * interestRate) /
      (1 - Math.pow(1 + interestRate, -numberOfPayments))
    );
  }

  private calculateDebtToIncome(): number {
    const annualPayment = this.calculateMonthlyPayment() * 12;
    const grossIncome = this.grossIncome();

    return grossIncome ? annualPayment / grossIncome : 0;
  }

  private calculateLoanToValue(): number {
    const loanAmount = this.borrowingAmount();
    const purchasePrice = this.purchasePrice();

    return loanAmount && purchasePrice ? (loanAmount / purchasePrice) : 0;
  }

  public setValues(mortgage: Mortgage) {
    this.borrowingAmount.set(mortgage.borrowingAmount);
    this.purchasePrice.set(mortgage.purchasePrice);
    this.repaymentPeriod.set(mortgage.repaymentPeriod);
    this.grossIncome.set(mortgage.grossIncome);
    this.interestRate.set(mortgage.interestRate);
  }
}
