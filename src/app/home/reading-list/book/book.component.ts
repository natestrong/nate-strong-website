import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Book} from "../../../models/Book";

@Component({
  selector: 'app-book',
  template: `
    <div class="book-container">
      <img [src]="book.image" alt="book cover">
      <h1>{{book.title}}</h1>
      <p>{{book.subtitle}}</p>
    </div>
  `,
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.book);
  }

}
