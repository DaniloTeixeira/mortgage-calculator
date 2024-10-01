import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskDirective } from 'ngx-mask';
import { MortgageService } from '../../services/mortgage.service';

@Component({
  selector: 'app-card-calculation',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, NgxMaskDirective],
  templateUrl: './card-calculation.component.html',
  styleUrl: './card-calculation.component.scss'
})
export class CardCalculationComponent {
  public mortgageService = inject(MortgageService);
}
