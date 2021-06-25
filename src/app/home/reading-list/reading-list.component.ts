import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
      [hidden]="!showLeftArrow">
    </fa-icon>

    <div>
      <section fxLayout fxLayoutGap="20px" class="reading-list-container" #listContainer>
        <div class="previous" fxLayout="column" fxLayoutAlign="start end">
          <span class="description">&larr;recently finished</span>
          <div fxLayout fxLayoutGap="26px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).previous"
                      [style]="{opacity: book.opacity}"
                      [book]="book">
            </app-book>
          </div>
        </div>
        <div class="current" fxLayout="column" fxLayoutAlign="start center">
          <span class="description">I'm currently reading &darr;</span>
          <div fxLayout fxLayoutGap="32px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).current"
                      [style]="{opacity: book.opacity}"
                      [book]="book"
                      [scrollTo]="true">
            </app-book>
          </div>
        </div>

        <div class="future">
          <span class="description">what's next&rarr;</span>
          <div fxLayout fxLayoutGap="32px" class="book-list">
            <app-book *ngFor="let book of (bookService.books$ | async).future"
                      [style]="{opacity: book.opacity}"
                      [book]="book">
            </app-book>
          </div>
        </div>
      </section>

      <fa-icon class="arrow right"
               [icon]="rightArrow"
               (click)="onRightArrow()"
               *ngIf="showRightArrow">
      </fa-icon>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements OnInit, AfterViewInit {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  @ViewChild('listContainer', {static: false}) listContainer: ElementRef<HTMLElement>;

  scroller: SweetScroll;
  showRightArrow: boolean = true;
  showLeftArrow: boolean = true;

  constructor(public bookService: BookService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // const observer = new IntersectionObserver(console.log);
    // observer.observe(this.listContainer.nativeElement);


    this.scroller = new SweetScroll(
      {
        vertical: false,
        horizontal: true,
      },
      this.listContainer.nativeElement
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
