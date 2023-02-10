import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
    img{
      width: 300px;
      display: block;
    }
    
     @media (min-width: 450px){
      .grid {
        grid-template-columns: repeat(2,1fr);
      }
    }
    
    @media (min-width: 840px){
      .grid {
        grid-template-columns: repeat(3,1fr);
      }
    }
    
    @media (min-width: 1110px){
      .grid {
        grid-template-columns: repeat(4,1fr);
      }
    } 
    `
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
