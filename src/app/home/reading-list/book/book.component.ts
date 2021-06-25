import {Component, OnInit, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {Book} from "../../../models/Book";
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  template: `
    <div class="book-container">
      <img [src]="book.image" alt="book cover">
      <div *ngIf="book.recommended">
        <fa-icon [icon]="star"></fa-icon>
        <fa-icon class='small' [icon]="star"></fa-icon>
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
