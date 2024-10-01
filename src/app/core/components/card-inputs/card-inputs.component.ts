import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MortgageService } from '@services/mortgage';

import { CardCalculationComponent } from '@components/card-calculation';
import { InputComponent } from '@components/input';
import { NavigationTrackerComponent } from '@components/navigation-tracker';
import { SelectComponent } from '@components/select';
import { Mortgage } from '@interfaces/mortgage.interface';
import { LoaderService } from '@services/loader';
import { delay, tap, timer } from 'rxjs';

const MODULES = [CommonModule, MatTooltipModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [InputComponent, SelectComponent, CardCalculationComponent, NavigationTrackerComponent];

@Component({
  selector: 'app-card-inputs',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS,],
  templateUrl: './card-inputs.component.html',
  styleUrl: './card-inputs.component.scss'
})
export class CardInputsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly loaderService = inject(LoaderService);

  readonly mortgageService = inject(MortgageService);

  readonly form = this.buildForm();

  shouldBlurCaculationValues = true;
  selectedOption: string | null = null;

  timer$ = timer(1000);

  ngOnInit(): void {
    this.loadCalculation();
    this.formChangesListener();
  }

  private formChangesListener(): void {

    this.form.valueChanges.pipe(
      tap(() => this.loaderService.setIsLoading(true)),
      delay(1000)
    ).subscribe((control) => {
      this.setMortgageValues();

      const blurValues = !control.borrowingAmount || !control.purchasePrice || !control.repaymentPeriod || !control.grossIncome || !control.interestRate;

      this.shouldBlurCaculationValues = blurValues;

      this.loaderService.setIsLoading(false);
    });
  }

  private setMortgageValues(): void {
    const formValue = this.form.getRawValue();

    this.mortgageService.setValues(formValue as Mortgage);
  }

  private buildForm() {
    return this.fb.group({
      borrowingAmount: [826800, Validators.required],
      purchasePrice: [910000, Validators.required],
      repaymentPeriod: [30, Validators.required],
      grossIncome: [225000, Validators.required],
      interestRate: [3.65, Validators.required],
    });
  }

  private loadCalculation() {
    this.timer$.subscribe(() => {
      this.shouldBlurCaculationValues = false;
    });
  }

  setpreferredRepaymentPeriod(period: number) {
    this.form.controls.repaymentPeriod.setValue(period);
  }
}
