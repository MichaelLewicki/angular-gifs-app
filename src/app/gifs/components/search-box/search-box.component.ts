import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      #txtTagInput
      (keyup.enter)="searchTag()"
    />
  `,
})
export class SeachBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; // '!' quiere decir que la variable es not null. Si no la colocamos, no podremos compilar la app. Debemos asegurarnos de enviar un valor siempre.

  //inyectar service
  constructor(
    private gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value; //capturar input text utilizando @ViewChild para capturar un elemento del DOM
    console.log({ newTag });
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = ''; //limpiar input text
  }
}
