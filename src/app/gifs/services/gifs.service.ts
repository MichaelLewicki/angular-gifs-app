import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private giphyApiKey: string = "qi2VTLE64EbkBcvcZDCcPIvUiZFYls4g";
  private giphyUrl: string = 'http://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient ) {
  }

  get getTagsHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    //validar que el tag no venga vacío
    if (tag.length === 0 ) return;

    const params = new HttpParams()
      .set('api_key', this.giphyApiKey)
      .set('limit', '10')
      .set('q', tag);

    this.organizeHistory(tag);
    this.http.get(`${this.giphyUrl}/search`, { params })
    .subscribe(resp => {
      console.log(resp);
    });



    //en este otro caso, haremos una petición http utilizando js, no angular.
    //Para que fetch funcione, hay que agregar a la firma del método:
    //1. async (antes del nombre del método)
    //2. : Promise<TipoDatoEsperado>
    //3. await a cada método u objeto que haga el uso de de la respuesta de fetch
    //const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=qi2VTLE64EbkBcvcZDCcPIvUiZFYls4g&q=valorant&limit=10');
    //.then( resp => resp.json() ) o podemos ingresar estas dos líneas y evitamos tener que ingresar await
    //.then( data => console.log(data));
    //const data = await resp.json();
    //console.log(data);
  };

  private organizeHistory(tag: string) {
    //convertir a minúscula ya que ts es case sensitive
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
