import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get getTagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    //validar que el tag no venga vacío
    if (tag.length === 0 ) return;

    this.organizeHistory(tag);
    console.log(this._tagsHistory);
  };

  private organizeHistory(tag: string) {
     //convertir a minúscula ya que ts en case sensitive
    tag = tag.toLowerCase();

    //Verificar si el tag existe en el arreglo antes de agregarlo.
    //Si existe, se eliminará del array y se agregará al principio
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( tagIngresed => tagIngresed !== tag );
    };

    //agregar al principio del array (.push es para agregar al final)
    this._tagsHistory.unshift(tag);

    //quitar 10 elementos del array a partir del elemento 0 y retornalos
    this._tagsHistory = this.getTagsHistory.splice(0, 10);
  };

}
