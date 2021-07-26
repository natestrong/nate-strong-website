import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Book} from "../../../models/Book";
import {faExternalLinkSquareAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-details',
  template: `
    <h1>{{book.title}} <a [href]="book.website" target="_blank">
      <fa-icon [icon]="openLinkIcon"></fa-icon>
    </a></h1>
    <h2>{{book.subtitle}}</h2>
    <div *ngIf="book.review">
      <p>My thoughts:</p>
      <p [innerHTML]="book.review" class="review-html"></p>
    </div>
  `,
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit {
  @Input('book') book: Book;
  openLinkIcon = faExternalLinkSquareAlt;

  constructor() {
  }

  ngOnInit(): void {
  }

}
