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
  private _bookSorted$: BehaviorSubject<SortedBooks> = new BehaviorSubject<SortedBooks>({
    previous: [],
    current: [],
    future: []
  });
  subscription: Subscription;

  constructor(private http: HttpClient) {
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
            result.current.push(book);
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
