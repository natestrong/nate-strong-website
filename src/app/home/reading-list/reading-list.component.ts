import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import SweetScroll from 'sweet-scroll';


@Component({
  selector: 'app-reading-list',
  template: `
    <h1 class="reading-list-title">My bookshelf</h1>
    <fa-icon class="arrow left" [icon]="leftArrow" (click)="onLeftArrow()"></fa-icon>
    <section fxLayout fxLayoutGap="32px" class="reading-list-container" #listContainer>
      <div fxLayout fxLayoutGap="32px" class="book-list previous">
        <app-book *ngFor="let book of (bookService.books$ | async).previous"
                  [style]="{opacity: book.opacity}"
                  [book]="book">
        </app-book>
      </div>
      <div fxLayout fxLayoutGap="32px" class="book-list current">
        <app-book *ngFor="let book of (bookService.books$ | async).current"
                  [style]="{opacity: book.opacity}"
                  [book]="book"
                  [scrollTo]="true">
        </app-book>
      </div>
      <div fxLayout fxLayoutGap="32px" class="book-list future">
        <app-book *ngFor="let book of (bookService.books$ | async).future"
                  [style]="{opacity: book.opacity}"
                  [book]="book">
        </app-book>
      </div>
    </section>
    <fa-icon class="arrow right" [icon]="rightArrow" (click)="onRightArrow()"></fa-icon>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements OnInit, AfterViewInit {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  @ViewChild('listContainer', {static: false}) listContainer: ElementRef<HTMLElement>;

  scroller: SweetScroll;

  constructor(public bookService: BookService) {
  }

  ngOnInit() {
    // const observer = new IntersectionObserver(console.log)
    // observer.observe()

  }

  ngAfterViewInit() {
    this.scroller = new SweetScroll(
      {vertical: false, horizontal: true},
      this.listContainer.nativeElement
    );
  }

  onLeftArrow() {
    this.scroller.to('-=300')
  }

  onRightArrow() {
    this.scroller.to('+=300')
  }
}
