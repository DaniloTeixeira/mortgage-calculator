import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { of } from 'rxjs';

import { InputComponent } from 'src/app/core/components/input';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let ngControlMock: Partial<NgControl>;

  beforeEach(async () => {
       ngControlMock = {
        valueAccessor: {
          writeValue: jest.fn(),
          registerOnChange: jest.fn(),
          registerOnTouched: jest.fn(),
        },
        control: {
          valueChanges: of(10000),
        } as AbstractControl
      };
      
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputComponent, NgxMaskDirective],
      providers: [
        provideEnvironmentNgxMask(),
        { provide: NgControl, useValue: ngControlMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('required', true);
    
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input element', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).toBeTruthy();
    expect(inputElement.nativeElement.classList).toContain('input-primary');
  });

  it('should call writeValue and update form control value', () => {
    component.writeValue(100);
    expect(component.controlInput.value).toBe(100);
  });

  it('should register onChange function', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.controlInput.setValue(200);
    expect(onChangeSpy).toHaveBeenCalledWith(200);
  });

  it('should register onTouch function and call it on focus', () => {
    const onTouchSpy = jest.fn();
    component.registerOnTouched(onTouchSpy);

    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.triggerEventHandler('focus', null);

    expect(onTouchSpy).toHaveBeenCalled();
  });

  it('should display the correct label and required status', () => {
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('span.text-primary'));
    expect(labelElement.nativeElement.textContent.trim()).toBe('Test Label');

    const requiredElement = fixture.debugElement.query(By.css('span.text-secondary'));
    expect(requiredElement.nativeElement.textContent.trim()).toBe('Required');
  });
});
