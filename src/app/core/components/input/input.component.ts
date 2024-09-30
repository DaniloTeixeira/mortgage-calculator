import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { optional: true });

  isDisabled = false;
  inputValue!: number;

  required = input(false);
  label = input.required<string | null>();

  onTouch?: () => void;
  onChange?: () => void;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (this.onTouch) {
      this.onTouch();
    }
  }

  writeValue(value: number): void {
    this.inputValue = value;
  }

  registerOnChange(fn: (() => {})): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (() => {})): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
