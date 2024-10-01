import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective } from 'ngx-mask';

import { MortgageService } from '@services/mortgage';

@Component({
  selector: 'app-card-calculation',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgxMaskDirective],
  templateUrl: './card-calculation.component.html',
  styleUrl: './card-calculation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCalculationComponent {
  readonly blurValue = input.required<boolean>();
  readonly mortgageService = inject(MortgageService);
}
