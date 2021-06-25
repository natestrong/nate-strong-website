import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {Book} from "../../../models/Book";
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  template: `
    <div class="book-container">
      <img [src]="book.image" alt="book cover">

      <div *ngIf="book.recommended" class="star">
        <fa-icon [icon]="star"></fa-icon>
        <fa-icon class='small' [icon]="star"></fa-icon>
        <span class="love-this-book">I love this book</span>
      </div>
    </div>

  `,
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  star = faStar;

  constructor() {
  }

  ngOnInit(): void {
  }
}
