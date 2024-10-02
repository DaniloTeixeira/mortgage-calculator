import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectComponent } from '@components/select';
import { OPTIONS } from '@constants/options';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;

    component.selectedOption = component.options[1];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should toggle the options display when clicked', () => {
    const customSelectElement = fixture.debugElement.query(By.css('.custom-select'));
    customSelectElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showOption).toBe(true);
    expect(fixture.nativeElement.querySelector('.custom-select__options')).toBeTruthy();

    customSelectElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showOption).toBe(false);
    expect(fixture.nativeElement.querySelector('.custom-select__options')).toBeNull();
  });

  it('should emit optionChosen when an option is selected', () => {
    const emitSpy = jest.spyOn(component.optionChosen, 'emit');

    const customSelectElement = fixture.debugElement.query(By.css('.custom-select'));
    customSelectElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    const optionElement = fixture.debugElement.queryAll(By.css('.custom-select__option'))[0];
    optionElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedOption).toEqual(component.options[0]);
    expect(emitSpy).toHaveBeenCalledWith(component.options[0].value);
  });

  it('should not change selectedOption if the same option is selected', () => {
    component.options = OPTIONS

    const initialSelectedOption = component.selectedOption;

    component.selectOption(initialSelectedOption);

    expect(component.selectedOption).toBe(initialSelectedOption);

    const selectedOptionInList = component.options.find(opt => opt.id === initialSelectedOption.id);
    expect(selectedOptionInList?.selected).toBe(false);
  });

  it('should set showOption to false when clicking outside', () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    const outsideElement = document.createElement('div');
    outsideElement.id = 'outside-element';
    document.body.appendChild(outsideElement);

    outsideElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.showOption).toBe(false);

    document.body.removeChild(outsideElement);
  });

  it('should not change showOption when clicking inside the select', () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    const customSelectElement = fixture.debugElement.nativeElement.querySelector('#za6e0804_2bd0_4672-b79d_d97027f9071a');
    
    customSelectElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(component.showOption).toBe(true);
  });
});
