import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTooltipModule } from '@angular/material/tooltip';
import { InputComponent } from '@components/input';
import { SelectComponent } from '@components/select';
import { OPTIONS } from '@constants/options';
import { MortgageService } from '../../services/mortgage/mortgage.service';
import { CardCalculationComponent } from "../card-calculation/card-calculation.component";

const MODULES = [CommonModule, MatTooltipModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [InputComponent, SelectComponent, CardCalculationComponent];

@Component({
  selector: 'app-card-inputs',
  standalone: true,
  imports: [...MODULES, ...COMPONENTS],
  templateUrl: './card-inputs.component.html',
  styleUrl: './card-inputs.component.scss'
})
export class CardInputsComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  public readonly mortgageService = inject(MortgageService);

  private preferredRepaymentPeriod = OPTIONS[1].value;

  form = this.buildForm();
  selectedNavigationItem = 2;
  readonly navigationTrackerItems = Array.from({ length: 8 });

  ngOnInit(): void {
    this.formChangesListener();
  }

  private formChangesListener(): void {
    this.form.valueChanges.subscribe(() => this.setMortgageValues());
  }

  private setMortgageValues(): void {
    const formValue = this.form.getRawValue();

    this.mortgageService.setValues(formValue);
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

  // Simulates the navigation tracker
  onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }

  setpreferredRepaymentPeriod(period: number) {
    this.form.controls.repaymentPeriod.setValue(period);
  }
}
