import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(
    private heroeService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroe(id))
      )
      .subscribe(heroe => this.heroe = heroe)

  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackbar('Registro Actualizado!'));

    } else {
      // guardar
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackbar('Registro Actualizado!')
        });
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    });

    // dialog.afterClosed().subscribe(
    //   (result) => {
    //     if (result) {
    //       this.heroeService.eliminarHeroe(this.heroe.id!)
    //       .subscribe(resp => {
    //         this.router.navigate(['/heroes'])
    //       })
    //     }
    //   }
    // )

    dialog.afterClosed()
      .pipe(
        switchMap((result) =>
          (result) ? this.heroeService.eliminarHeroe(this.heroe.id!)
            : this.router.navigate([`heroes/editar/${this.heroe.id}`]))
      )
      .subscribe(
        (heroe) => {
          if (heroe) {
            this.router.navigate(['heroes']);
          }
        }
      )
  }

  mostrarSnackbar(mensaje: string) {

    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    });

  }

}