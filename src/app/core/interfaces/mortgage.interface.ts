import { FormControl } from '@angular/forms';

export interface Mortgage {
    borrowingAmount: number,
    purchasePrice: number,
    repaymentPeriod: number,
    grossIncome: number,
    interestRate: number;
}

export interface MortgageForm {
    borrowingAmount: FormControl<number | null>,
    purchasePrice: FormControl<number | null>,
    repaymentPeriod: FormControl<number | null>,
    grossIncome: FormControl<number | null>,
    interestRate: FormControl<number | null>;
}
