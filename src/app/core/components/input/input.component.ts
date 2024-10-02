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

  public readonly controlInput = new FormControl<number | null>(null);

  public iconInput = input('');
  public inputClass = input('');
  public required = input(false);

  public iconLabel = input<string>();
  public altIconLabel = input<string>();
  public altIconInput = input<string>();
  public label = input<string | null>();

  public onTouch?: () => void;
  public onChange?: (_: number | null) => void;

  constructor() {
    this.ngControl.valueAccessor = this;
    this.registerChanges();
  }

  private registerChanges(): void {
    this.controlInput.valueChanges.subscribe((value) => {
      this.onChange?.(value);
    });
  }

  public writeValue(value: number): void {
    this.controlInput.setValue(value);
  }

  public registerOnChange(fn: (() => void)): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (() => void)): void {
    this.onTouch = fn;
  }
}
