import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {Book} from "../../models/Book";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-reading-list',
  template: `
    <app-book *ngFor="let book of books$ | async" [book]="book"></app-book>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent {
  books$: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.books$ = bookService.getBooks().pipe(tap(console.log));
  }
}
