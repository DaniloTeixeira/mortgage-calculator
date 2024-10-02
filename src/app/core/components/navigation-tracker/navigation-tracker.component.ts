import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation-tracker',
  standalone: true,
  imports: [],
  templateUrl: './navigation-tracker.component.html',
  styleUrl: './navigation-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTrackerComponent {
  public selectedNavigationItem = 2;
  public readonly navigationTrackerItems = Array.from({ length: 8 });

  // Simulates the navigation tracker
  public onSelectedItem(index: number) {
    this.selectedNavigationItem = index;
  }
}
