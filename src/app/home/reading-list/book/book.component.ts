import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Book} from "../../../models/Book";

@Component({
  selector: 'app-book',
  template: `
    <p>
      {{book.title}} {{book.subtitle}}
    </p>
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
