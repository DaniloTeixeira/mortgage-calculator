import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = signal(false);

  setIsLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }

  getIsLoading() {
    return computed(() => this.isLoading());
  }

}
