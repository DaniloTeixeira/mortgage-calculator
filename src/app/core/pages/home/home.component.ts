import { Component } from '@angular/core';
import { CardInputsComponent } from '../../components/card-inputs';
import { FooterComponent } from '../../components/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardInputsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
