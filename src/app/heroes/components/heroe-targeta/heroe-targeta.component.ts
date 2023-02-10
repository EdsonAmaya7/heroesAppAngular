import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-targeta',
  templateUrl: './heroe-targeta.component.html',
  styles: [
  ]
})
export class HeroeTargetaComponent {

  @Input() heroe!: Heroe;
  


}
