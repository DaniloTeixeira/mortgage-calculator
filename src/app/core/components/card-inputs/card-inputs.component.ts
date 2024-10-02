import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, delay, distinctUntilChanged, filter, tap, timer } from 'rxjs';

import { CardCalculationComponent } from '@components/card-calculation';
import { InputComponent } from '@components/input';
import { NavigationTrackerComponent } from '@components/navigation-tracker';
import { SelectComponent } from '@components/select';
import { Mortgage, MortgageForm } from '@interfaces/mortgage.interface';
import { LoaderService } from '@services/loader';
import { MortgageService } from '@services/mortgage';

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

  public readonly mortgageService = inject(MortgageService);
  public readonly form = this.buildForm();

  public shouldBlurCaculationValues = true;
  public selectedOption: string | null = null;
  public timer$ = timer(1500);

  ngOnInit(): void {
    this.loadCalculation();
    this.formChangesListener();
  }

  private formChangesListener(): void {
    this.form.valueChanges.pipe(
      filter(() => this.form.valid),
      debounceTime(500),
      distinctUntilChanged((prev, curr) => {
        return (
          prev.borrowingAmount === curr.borrowingAmount &&
          prev.purchasePrice === curr.purchasePrice &&
          prev.repaymentPeriod === curr.repaymentPeriod &&
          prev.grossIncome === curr.grossIncome &&
          prev.interestRate === curr.interestRate
        );
      }),
      tap(() => this.loaderService.setIsLoading(true)),
      delay(1000)
    ).subscribe(() => {
      this.setMortgageValues();

      this.loaderService.setIsLoading(false);
    });
  }

  private setMortgageValues(): void {
    const formValue = this.form.getRawValue();

    this.mortgageService.setValues(formValue as Mortgage);
  }

  private buildForm(): FormGroup<MortgageForm> {
    return this.fb.group({
      borrowingAmount: [826800, Validators.required],
      purchasePrice: [910000, Validators.required],
      repaymentPeriod: [30, Validators.required],
      grossIncome: [225000, Validators.required],
      interestRate: [3.65, Validators.required],
    });
  }

  private loadCalculation(): void {
    this.timer$.subscribe(() => {
      this.shouldBlurCaculationValues = false;
    });
  }

  public setpreferredRepaymentPeriod(period: number): void {
    this.form.controls.repaymentPeriod.setValue(period);
  }
}
