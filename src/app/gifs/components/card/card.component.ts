import { Component, Input, OnInit } from '@angular/core';

import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input()
  public gif!: Gif; //se ingresa "!" (not null) para que no tengamos que inicializar el objeto

  ngOnInit(): void {
    //"(!this.gif)" === si gif es undefined
    if (!this.gif) {
      throw new Error('This property is undefined and it is required');
    }
  }

}
