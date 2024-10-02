import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have a "Go Back" button with the correct text and classes', () => {
    const goBackButton = fixture.debugElement.query(By.css('.btn-neutral'));
    expect(goBackButton).toBeTruthy(); // Verifica se o botão existe
    expect(goBackButton.nativeElement.classList).toContain('btn');
    expect(goBackButton.nativeElement.classList).toContain('btn-neutral');
    expect(goBackButton.nativeElement.classList).toContain('w-[117px]');
    expect(goBackButton.nativeElement.classList).toContain('h-[52px]');
    expect(goBackButton.nativeElement.classList).toContain('text-lg');
  });

  it('should have a "Next Step" button with the correct text and classes', () => {
    const nextStepButton = fixture.debugElement.query(By.css('.btn-primary'));
    expect(nextStepButton).toBeTruthy(); // Verifica se o botão existe
    expect(nextStepButton.nativeElement.classList).toContain('btn');
    expect(nextStepButton.nativeElement.classList).toContain('btn-primary');
    expect(nextStepButton.nativeElement.classList).toContain('w-[129px]');
    expect(nextStepButton.nativeElement.classList).toContain('h-[52px]');
    expect(nextStepButton.nativeElement.classList).toContain('text-lg');
  });

});
