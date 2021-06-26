import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Book} from "../models/Book";
import {map} from "rxjs/operators";

type SortedBooks = { previous: Book[], current: Book[], future: Book[] }

@Injectable({
  providedIn: 'root'
})
export class BookService {
  date: Date = new Date();
  private _bookSorted$: BehaviorSubject<SortedBooks>;
  subscription: Subscription;

  constructor(private http: HttpClient) {
    const book = {};
    this._bookSorted$ = new BehaviorSubject<any>({
      previous: [book, book],
      current: [book, book],
      future: [book, book]
    });
  }

  getProgressFromDate(startDate, endDate): number {
    const totalTime = +endDate - +startDate;
    const timeElapsed = +this.date - +startDate
    return (timeElapsed / totalTime) * 100
  }

  fetchBooks(): Observable<SortedBooks> {
    return this.http.get<Book[]>('/.netlify/functions/getBooks', {
      headers: {
        'Content-type': 'application/json'
      }
    }).pipe(
      map((books) => {
        const result: SortedBooks = {previous: [], current: [], future: []};
        books.forEach(book => {
          if (book.startedDate) {
            book.startedDate = new Date(book.startedDate);
          }
          if (book.finishedDate) {
            book.finishedDate = new Date(book.finishedDate);
          }

          if (book.finishedDate && book.finishedDate < this.date) {
            result.previous.push(book);
          } else if (book.startedDate && this.date < book.finishedDate) {
            book.finishedDate.setDate(book.finishedDate.getDate() + 1);
            result.current.push(book);
            book.progress = this.getProgressFromDate(book.startedDate, book.finishedDate);
          } else {
            result.future.push(book);
          }
        });

        return result;
      })
    );
  }

  get books$(): Observable<SortedBooks> {
    if (!this.subscription) {
      this.subscription = this.fetchBooks().subscribe(this._bookSorted$);
    }

    return this._bookSorted$;
  }
}
