import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideEnvironmentNgxMask } from 'ngx-mask';

import { CardInputsComponent } from '@components/card-inputs';
import { FooterComponent } from '@components/footer';
import { HomeComponent } from '@pages/home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, CardInputsComponent, FooterComponent],
      providers: [provideEnvironmentNgxMask()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-card-inputs and app-footer', () => {
    const cardInputsElement = fixture.nativeElement.querySelector('app-card-inputs');
    const footerElement = fixture.nativeElement.querySelector('app-footer');

    expect(cardInputsElement).toBeTruthy(); 
    expect(footerElement).toBeTruthy(); 
  });
});
