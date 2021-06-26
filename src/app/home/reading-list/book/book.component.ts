import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {Book} from "../../../models/Book";
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  template: `
    <div class="book-container">
      <div *ngIf="!imgLoaded" class="img-loading"></div>
      <img *ngIf="book.image" [src]="book.image + '?h=200'" loading="lazy" (load)="onLoad()" [alt]="book.title" draggable="false">

      <div *ngIf="book.recommended" class="star">
        <fa-icon [icon]="star"></fa-icon>
        <fa-icon class='small' [icon]="star"></fa-icon>
        <span class="love-this-book">I love this book</span>
      </div>

      <progress *ngIf='book.progress'
                [value]="book.progress"
                max="100">
      </progress>
    </div>

  `,
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  @Input() book: Book;
  star = faStar;
  imgLoaded: boolean = false;

  onLoad() {
    this.imgLoaded = true;
  }
}
