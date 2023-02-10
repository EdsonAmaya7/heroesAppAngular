import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {
  heroe !: Heroe;
  
  constructor( 
    private activatedRoute: ActivatedRoute,
    private herieService: HeroesService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}): Observable<Heroe> => this.herieService.getHeroe(id))
    )
    .subscribe(heroe => { this.heroe = heroe})


  }

  

}
