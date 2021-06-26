import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {Book} from "../../../models/Book";
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  template: `
    <div class="book-container">
      <img [src]="book.image" alt="book cover" draggable="false">

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
  @ViewChild('bookContainer') bookContainer;
  star = faStar;
}
