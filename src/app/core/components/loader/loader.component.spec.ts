import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set class input correctly', () => {
    fixture.componentRef.setInput('class', 'custom-class');
    expect(component.class()).toBe('custom-class');
  });

  it('should set initialLoader input correctly', () => {
    fixture.componentRef.setInput('initialLoader', true);
    expect(component.initialLoader()).toBe(true);
    
    fixture.componentRef.setInput('initialLoader', false);
    expect(component.initialLoader()).toBe(false);
  });

  it('should set size input correctly', () => {
    fixture.componentRef.setInput('size', 'md');
    expect(component.size()).toBe('md');
  });

  it('should display loading dots when initialLoader is true', () => {
    fixture.componentRef.setInput('initialLoader', true);
    fixture.detectChanges();
    const loaderElement = fixture.nativeElement.querySelector('.loading-dots');
    expect(loaderElement).toBeTruthy(); // Verifica se os dots de carregamento estão presentes
  });

  it('should apply correct class', () => {
    fixture.componentRef.setInput('class', 'test-class');
    fixture.detectChanges();
    const loaderDiv = fixture.nativeElement.querySelector('div');
    expect(loaderDiv.classList.contains('test-class')).toBe(true); // Verifica se a classe correta foi aplicada
  });
});
