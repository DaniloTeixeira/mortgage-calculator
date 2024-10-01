import { Injectable, computed, signal } from '@angular/core';
import { Mortgage } from '@interfaces/mortgage.interface';

@Injectable({
  providedIn: 'root',
})
export class MortgageService {
  // Valores iniciais (Signals reativos)
  private borrowingAmount = signal(826800); // Valor do empréstimo
  private purchasePrice = signal(910000); // Preço da compra
  private repaymentPeriod = signal(30); // Anos
  private grossIncome = signal(225000); // Renda bruta anual
  private interestRate = signal(3.65); // % ao ano

  // Cálculos dinâmicos usando `computed` para reatividade
  readonly termYears = computed(() => this.repaymentPeriod());
  readonly loanToValue = computed(() => this.calculateLoanToValue());
  readonly debtToIncome = computed(() => this.calculateDebtToIncome());
  readonly monthlyPayment = computed(() => this.calculateMonthlyPayment());

  // Método para calcular o pagamento mensal (Valor por mês)
  private calculateMonthlyPayment(): number {
    const principal = this.borrowingAmount(); // Valor do empréstimo
    const interestRate = this.interestRate() / 100 / 12; // Taxa de juros mensal
    const numberOfPayments = this.repaymentPeriod() * 12; // Número total de pagamentos (meses)

    if (interestRate === 0) {
      return principal / numberOfPayments;
    }

    // Fórmula de pagamento de hipoteca (P = principal, r = taxa de juros, n = número de pagamentos)
    return (
      (principal * interestRate) /
      (1 - Math.pow(1 + interestRate, -numberOfPayments))
    );
  }

  // Método para calcular Debt to Income (Relação dívida/renda)
  private calculateDebtToIncome(): number {
    const annualPayment = this.calculateMonthlyPayment() * 12; // Pagamento anual
    const grossIncome = this.grossIncome(); // Renda bruta anual

    return grossIncome ? annualPayment / grossIncome : 0; // Relação dívida/renda
  }

  // Método para calcular Loan to Value (Relação empréstimo/valor)
  private calculateLoanToValue(): number {
    const loanAmount = this.borrowingAmount(); // Valor do empréstimo
    const purchasePrice = this.purchasePrice(); // Preço de compra

    return loanAmount && purchasePrice ? (loanAmount / purchasePrice) : 0;
  }

  setValues(mortgage: Mortgage) {
    this.borrowingAmount.set(mortgage.borrowingAmount);
    this.purchasePrice.set(mortgage.purchasePrice);
    this.repaymentPeriod.set(mortgage.repaymentPeriod);
    this.grossIncome.set(mortgage.grossIncome);
    this.interestRate.set(mortgage.interestRate);
  }
}
