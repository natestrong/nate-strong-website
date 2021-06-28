import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import SweetScroll from 'sweet-scroll';
import {fromEvent, Subscription} from "rxjs";
import {map, mergeMap, pairwise, pluck, takeUntil, tap} from "rxjs/operators";


@Component({
  selector: 'app-reading-list',
  template: `
    <h1 class="reading-list-title">My bookshelf</h1>

    <fa-icon
      tabindex="0"
      class="arrow left"
      [icon]="leftArrow"
      (click)="onLeftArrow()"
      (keyup.enter)="onLeftArrow()"
      [ngStyle.lt-sm]="{'left': '0px'}">
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
             tabindex="0"
             (keyup.enter)="onRightArrow()">
    </fa-icon>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements AfterViewInit, OnDestroy {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  @ViewChild('listContainer', {static: false}) listContainer: ElementRef<HTMLElement>;

  scroller: SweetScroll;

  private mouseDownSubscription: Subscription;

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

    const down$ = fromEvent(this.listContainer.nativeElement, 'mousedown');
    const up$ = fromEvent(document, 'mouseup');
    const move$ = fromEvent(document, 'mousemove')
      .pipe(
        takeUntil(up$),
        pluck('clientX'),
        pairwise(),
        map(([p, c]) => (p as number) - (c as number))
      );
    this.mouseDownSubscription = down$
      .pipe(
        tap(event => event.preventDefault()),
        mergeMap(() => move$)
      )
      .subscribe(move => this.listContainer.nativeElement.scrollLeft += move);
  }

  ngOnDestroy() {
    this.mouseDownSubscription.unsubscribe();
  }

  onLeftArrow() {
    this.scroller.to('-=300');
  }

  onRightArrow() {
    this.scroller.to('+=300');
  }
}
