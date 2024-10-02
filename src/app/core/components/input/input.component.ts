import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl);

  controlInput = new FormControl<number | null>(null);

  iconInput = input('');
  inputClass = input('');
  required = input(false);

  iconLabel = input<string>();
  altIconLabel = input<string>();
  altIconInput = input<string>();
  label = input<string | null>();

  onTouch?: () => void;
  onChange?: (_: number | null) => void;

  constructor() {
    this.ngControl.valueAccessor = this;
    this.registerChanges();
  }

  private registerChanges(): void {
    this.controlInput.valueChanges.subscribe((value) => {
      this.onChange?.(value);
    });
  }

  writeValue(value: number): void {
    this.controlInput.setValue(value);
  }

  registerOnChange(fn: (() => void)): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (() => void)): void {
    this.onTouch = fn;
  }
}
