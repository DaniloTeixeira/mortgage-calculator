import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  public selectedNavigationItem = 2;
  public readonly navigationTrackerItems = Array.from({length: 8})

  // Simulates the navigation tracker
  public onSelectedItem(index: number) {
  this.selectedNavigationItem = index;
  }

}
