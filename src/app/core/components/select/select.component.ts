import { ChangeDetectionStrategy, Component, HostListener, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OPTIONS } from 'src/app/core/constants/options';
import { Option } from 'src/app/core/interfaces/option.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SelectComponent {
  @HostListener('document:click', ['$event'])
  trackClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('#za6e0804_2bd0_4672-b79d_d97027f9071a')) {
      this.showOption = false;
    }

    event.stopPropagation();
  }

  public optionChosen = output<number>();

  public options = OPTIONS;
  public showOption = false;
  public selectedOption = this.options[1];

  public toggleShowOption(): void {
    this.showOption = !this.showOption;
  }

  public selectOption(option: Option): void {
    if (option === this.selectedOption) {
      return;
    }

    this.options.forEach((opt, index) => {
      if (option.id === opt.id) {
        this.options[index].selected = true;
      } else {
        this.options[index].selected = false;
      }
    });

    this.selectedOption = option;
    this.optionChosen.emit(option.value);
  }
}

