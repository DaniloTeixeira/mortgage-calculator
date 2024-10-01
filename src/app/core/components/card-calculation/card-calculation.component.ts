import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective } from 'ngx-mask';

import { LoaderComponent } from '@components/loader';
import { LoaderService } from '@services/loader';
import { MortgageService } from '@services/mortgage';

@Component({
  selector: 'app-card-calculation',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgxMaskDirective, LoaderComponent],
  templateUrl: './card-calculation.component.html',
  styleUrl: './card-calculation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCalculationComponent {
  private readonly loaderService = inject(LoaderService);

  readonly blurValue = input.required<boolean>();
  readonly mortgageService = inject(MortgageService);

  readonly isLoading = this.loaderService.getIsLoading();

}
