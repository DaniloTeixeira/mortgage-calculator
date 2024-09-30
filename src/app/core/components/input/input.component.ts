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
  private readonly ngControl = inject(NgControl, { optional: true });

  required = input(false);
  iconInput = input('');
  altIconLabel = input.required<string>();
  label = input.required<string | null>();
  iconLabel = input.required<string>();
  altIconInput = input.required<string>();
  inputClass = input('');
  control = new FormControl<number | null>(null);

  onTouch?: () => void;
  onChange?: (_: number) => void;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.registerChanges();
  }

  private registerChanges(): void {
    this.control.valueChanges.subscribe((value) => {
      this.onChange?.(value as number);
    });
  }

  writeValue(value: number): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: (() => void)): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (() => void)): void {
    this.onTouch = fn;
  }
}
