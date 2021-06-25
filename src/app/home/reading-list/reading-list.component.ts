import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/Book";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";


@Component({
  selector: 'app-reading-list',
  template: `
    <h1 class="reading-list-title">I'm currently reading..</h1>
    <section fxLayout="row" fxLayoutGap="32px" class="reading-list-container">
      <app-book *ngFor="let book of books$ | async"
                [book]="book"
                [scrollTo]="book.startedDate && book.finishedDate > date">
      </app-book>
    </section>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  books$: Observable<Book[]>;
  date: Date = new Date();

  constructor(private bookService: BookService) {
    this.books$ = bookService.getBooks()
      .pipe(
        map(books => books.map(book => {
          return {
            ...book,
            startedDate: new Date(book.startedDate),
            finishedDate: new Date(book.finishedDate),
          }
        })),
      );
  }
}
