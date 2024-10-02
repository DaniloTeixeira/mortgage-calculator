import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = signal(false);

  public setIsLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }

  public getIsLoading() {
    return computed(() => this.isLoading());
  }

}
