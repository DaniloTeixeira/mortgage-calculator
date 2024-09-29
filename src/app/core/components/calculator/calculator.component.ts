import { Component, HostListener } from '@angular/core';

import { OPTIONS } from '@constants/options';
import { Option } from '@interfaces/option.interface';

import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  @HostListener('document:click', ['$event'])
  trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest(`#${this.hashID}`)) {
      this.showOption = false;
    }

    event.stopPropagation();
  }

  public readonly hashID = uuidv4();
  public showOption = false;
  public readonly options = OPTIONS;
  public selectedOption = this.options[1];

  public selectedNavigationItem = 2;
  public readonly navigationTrackerItems = Array.from({ length: 8 });

  // Simulates the navigation tracker
  public onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }

  public toggleShowOption() {
    this.showOption = !this.showOption;
  }

  public selectOption(option: Option) {
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
