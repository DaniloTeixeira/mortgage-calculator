import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputComponent } from '@components/input';
import { SelectComponent } from '@components/select';
import { OPTIONS } from '@constants/options';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [InputComponent, FormsModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  private preferredRepaymentPeriod = OPTIONS[1].value;

  form = this.buildForm();
  selectedNavigationItem = 2;
  readonly navigationTrackerItems = Array.from({ length: 8 });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(console.log);
  }

  private buildForm() {
    return this.fb.group({
      borrowingAmount: [826800, Validators.required],
      purchasePrice: [910000, Validators.required],
      grossHouseholdIncome: [225000, Validators.required],
      interestRate: [3.65, Validators.required],
    });
  }

  // Simulates the navigation tracker
  onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }

  setpreferredRepaymentPeriod(period: string) {
    this.preferredRepaymentPeriod = period;
  }
}
