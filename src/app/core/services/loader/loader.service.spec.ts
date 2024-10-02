import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service'; // ajuste o caminho conforme necessário

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when loading is not set', () => {
    expect(service.getIsLoading()()).toBe(false); 
  });

  it('should set loading state to true', () => {
    service.setIsLoading(true);
    expect(service.getIsLoading()()).toBe(true); 
  });

  it('should set loading state to false', () => {
    service.setIsLoading(false);
    expect(service.getIsLoading()()).toBe(false); 
  });

  it('should change loading state reactively', () => {
    service.setIsLoading(true);
    expect(service.getIsLoading()()).toBe(true); 
    
    service.setIsLoading(false);
    expect(service.getIsLoading()()).toBe(false); 
  });
});
