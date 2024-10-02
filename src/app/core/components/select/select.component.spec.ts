import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OPTIONS } from '../../constants/options';
import { SelectComponent } from './select.component';

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

    // Defina a opção padrão para um valor que você espera
    component.selectedOption = component.options[1]; // ou outra lógica para definir a opção inicial
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
    customSelectElement.triggerEventHandler('click', null); // Abre as opções
    fixture.detectChanges();

    const optionElement = fixture.debugElement.queryAll(By.css('.custom-select__option'))[0]; // Seleciona a primeira opção
    optionElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedOption).toEqual(component.options[0]);
    expect(emitSpy).toHaveBeenCalledWith(component.options[0].value);
  });

  it('should not change selectedOption if the same option is selected', () => {
    component.options = OPTIONS

    const initialSelectedOption = component.selectedOption; // 'Option 2'

    // Chama selectOption com a mesma opção
    component.selectOption(initialSelectedOption); // Passa 'Option 2' novamente

    // Verifica se selectedOption ainda é a mesma
    expect(component.selectedOption).toBe(initialSelectedOption);

    // Opcional: Verifique se a propriedade "selected" da opção permanece falsa
    const selectedOptionInList = component.options.find(opt => opt.id === initialSelectedOption.id);
    expect(selectedOptionInList?.selected).toBe(false); // 'Option 2' não deve ter a propriedade 'selected' alterada
  });

  it('should set showOption to false when clicking outside', () => {
    // Simulando um clique fora do componente
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // Criar um elemento para simular o clique fora
    const outsideElement = document.createElement('div');
    outsideElement.id = 'outside-element';
    document.body.appendChild(outsideElement);

    // Dispara o evento de clique
    outsideElement.dispatchEvent(event);
    fixture.detectChanges(); // Atualiza o fixture após o evento

    // Verifica se showOption foi definido como false
    expect(component.showOption).toBe(false);

    // Limpa o elemento fora do DOM
    document.body.removeChild(outsideElement);
  });

  it('should not change showOption when clicking inside the select', () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });

    // Simulando um clique dentro do componente
    const customSelectElement = fixture.debugElement.nativeElement.querySelector('#za6e0804_2bd0_4672-b79d_d97027f9071a');
    
    // Dispara o evento de clique no elemento dentro do componente
    customSelectElement.dispatchEvent(event);
    fixture.detectChanges(); // Atualiza o fixture após o evento

    // Verifica se showOption ainda é true
    expect(component.showOption).toBe(true);
  });
});
