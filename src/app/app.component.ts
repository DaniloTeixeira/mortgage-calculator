import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { timer } from 'rxjs';

import { LoaderComponent } from "@components/loader";
import { NavigationTrackerComponent } from "@components/navigation-tracker";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationTrackerComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private  timer$ = timer(2000);
  public loadingApp = true;

  ngOnInit(): void {
    this.timer$.subscribe(() => this.loadingApp = false);
  }
}
