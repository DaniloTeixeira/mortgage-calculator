import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = signal(false);

  public setIsLoading(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }

  public getIsLoading(): Signal<boolean> {
    return computed(() => this.isLoading());
  }

}
