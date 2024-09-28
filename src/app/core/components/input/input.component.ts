import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  public readonly inputIcon = input<string>();
  public readonly required = input<boolean>();
  public readonly placeholder = input<string>('');
  public readonly label = input.required<string>();
}
