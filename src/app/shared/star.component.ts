import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from "@angular/core";

@Component({
  selector:'pm-star',
  templateUrl: './star.Component.html',
  styleUrls: ['./star.component.css']
})


export class StarComponent implements OnChanges {
   cropWidth: number = 75;
   @Input() rating: number = 0;
   @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    //75 es el año del contenedor, y lo cortaremos según nº de estrellas (rating)

    this.cropWidth = this.rating * 75/5;

  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`)
  }


}
