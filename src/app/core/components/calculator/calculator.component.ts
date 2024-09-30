import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputComponent } from '@components/input';
import { OPTIONS } from '@constants/options';
import { Option } from '@interfaces/option.interface';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  @HostListener('document:click', ['$event'])
  trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('#za6e0804_2bd0_4672-b79d_d97027f9071a')) {
      this.showOption = false;
    }

    event.stopPropagation();
  }

  form = this.buildForm();
  showOption = false;
  readonly options = OPTIONS;
  selectedOption = this.options[1];

  selectedNavigationItem = 2;
  readonly navigationTrackerItems = Array.from({ length: 8 });

  ngOnInit(): void {
    console.log(this.form);
  }

  private buildForm() {
    return this.fb.group({
      borrowingAmount: [null as number | null, Validators.required],
      purchasePrice: [null as number | null, Validators.required],
      preferredRepaymentPeriod: ['', Validators.required],
      grossHouseholdIncome: [null as number | null, Validators.required],
      interestRate: [null as number | null, Validators.required],
    });
  }

  // Simulates the navigation tracker
  onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }

  toggleShowOption() {
    this.showOption = !this.showOption;
  }

  selectOption(option: Option) {
    if (option === this.selectedOption) {
      return;
    }

    this.options.forEach((o, index) => {
      if (option.id === o.id) {
        this.options[index].selected = true;
      } else {
        this.options[index].selected = false;
      }
    });

    this.selectedOption = option;
  }
}
