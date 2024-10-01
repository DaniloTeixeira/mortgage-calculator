import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// TODO -> Verificar o motivo de nao aceitar import com o @types
import { LoaderSize } from 'src/app/core/types/loader-size.type';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  readonly class = input<string>();
  readonly initialLoader = input(false);
  readonly size = input<LoaderSize>('lg');
}
