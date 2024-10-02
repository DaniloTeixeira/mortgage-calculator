import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective } from 'ngx-mask';
import { LoaderService } from '../../services/loader';
import { MortgageService } from '../../services/mortgage';
import { LoaderComponent } from '../loader';

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

  public readonly blurValue = input.required<boolean>();
  public readonly mortgageService = inject(MortgageService);
  public readonly isLoading = this.loaderService.getIsLoading();
}
