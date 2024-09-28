import { Component } from '@angular/core';

import { CalculatorComponent } from '@components/calculator';
import { FooterComponent } from '@components/footer';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalculatorComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
