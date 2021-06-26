import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import SweetScroll from 'sweet-scroll';


@Component({
  selector: 'app-reading-list',
  template: `
    <h1 class="reading-list-title">My bookshelf</h1>

    <fa-icon
      class="arrow left"
      [icon]="leftArrow"
      (click)="onLeftArrow()"
      [ngStyle.lt-sm]="{'left': '0px'}"
      [hidden]="!showLeftArrow">
    </fa-icon>

    <div>
      <section fxLayout fxLayoutGap="20px" class="reading-list-container" #listContainer>
        <div class="previous" fxLayout="column" fxLayoutAlign="start end">
          <span class="description">&larr;recently finished</span>
          <div fxLayout fxLayoutGap="26px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).previous"
                      [book]="book">
            </app-book>
          </div>
        </div>
        <div class="current" fxLayout="column" fxLayoutAlign="start center">
          <span class="description">I'm currently reading &darr;</span>
          <div fxLayout fxLayoutGap="32px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).current"
                      [book]="book"
                      [scrollTo]="true">
            </app-book>
          </div>
        </div>

        <div class="future" fxLayout="column" fxLayoutAlign="start start">
          <span class="description">what's next&rarr;</span>
          <div fxLayout fxLayoutGap="32px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).future"
                      [id]="book.title"
                      [book]="book">
            </app-book>
          </div>
        </div>
      </section>
    </div>

    <fa-icon class="arrow right"
             [ngStyle.lt-sm]="{'right': '0px'}"
             [icon]="rightArrow"
             (click)="onRightArrow()"
             *ngIf="showRightArrow">
    </fa-icon>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements AfterViewInit {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  @ViewChild('listContainer', {static: false}) listContainer: ElementRef<HTMLElement>;

  scroller: SweetScroll;
  showRightArrow: boolean = true;
  showLeftArrow: boolean = true;

  constructor(public bookService: BookService) {
  }

  ngAfterViewInit() {
    const el = this.listContainer.nativeElement;
    this.scroller = new SweetScroll(
      {
        vertical: false,
        horizontal: true,
      },
      el
    );
  }

  onLeftArrow() {
    this.scroller.to('-=300');
    this.showRightArrow = true;
    const el = this.listContainer.nativeElement;
    this.showLeftArrow = el.scrollLeft > 400;
  }

  onRightArrow() {
    this.scroller.to('+=300');
    this.showLeftArrow = true;
    const el = this.listContainer.nativeElement;
    this.showRightArrow = (el.clientWidth < el.scrollWidth - el.scrollLeft - 400);
  }
}
