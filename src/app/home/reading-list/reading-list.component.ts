import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild
} from '@angular/core';
import {BookService} from "../../services/book.service";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import SweetScroll from 'sweet-scroll';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, filter, map, mergeMap, pairwise, pluck, takeUntil, tap, throttleTime} from "rxjs/operators";
import {Book} from "../../models/Book";


@Component({
    selector:'app-reading-list',
    template:`
        <h1 class='reading-list-title'>My bookshelf</h1>

        <fa-icon
                tabindex='0'
                class='arrow left'
                [icon]='leftArrow'
                (click)='onLeftArrow()'
                (keyup.enter)='onLeftArrow()'
                [ngStyle.lt-sm]="{'left': '0px'}">
        </fa-icon>

        <div>
            <section fxLayout
                     fxLayoutGap='20px'
                     class='reading-list-container'
                     #listContainer>
                <div class='previous'
                     fxLayout='column'
                     fxLayoutAlign='start end'>
                    <span class='description'>&larr;recently finished</span>
                    <div fxLayout
                         fxLayoutGap='26px'
                         class='book-list'>
                        <app-book *ngFor='let book of (bookService.books$ | async).previous'
                                  [class.selected]='selectedBook === book'
                                  [class.not-selected]='selectedBook && selectedBook !== book'
                                  (click)='onSelectBook(book)'
                                  [id]='book.title'
                                  [book]='book'>
                        </app-book>
                    </div>
                </div>
                <div class='current'
                     id='current-books'
                     fxLayout='column'
                     fxLayoutAlign='start center'>
                    <span class='description'>I'm currently reading &darr;</span>
                    <div fxLayout
                         fxLayoutGap='32px'
                         class='book-list'>
                        <app-book *ngFor='let book of (bookService.books$ | async).current'
                                  [class.selected]='selectedBook === book'
                                  [class.not-selected]='selectedBook && selectedBook !== book'
                                  (click)='onSelectBook(book)'
                                  [id]='book.title'
                                  [book]='book'
                                  [scrollTo]='true'>
                        </app-book>
                    </div>
                </div>

                <div class='future'
                     fxLayout='column'
                     fxLayoutAlign='start start'>
                    <span class='description'>what's next&rarr;</span>
                    <div fxLayout
                         fxLayoutGap='32px'
                         class='book-list'>
                        <app-book *ngFor='let book of (bookService.books$ | async).future'
                                  [class.selected]='selectedBook === book'
                                  [class.not-selected]='selectedBook && selectedBook !== book'
                                  (click)='onSelectBook(book)'
                                  [id]='book.title'
                                  [book]='book'>
                        </app-book>
                    </div>
                </div>
            </section>
        </div>

        <fa-icon class='arrow right'
                 [ngStyle.lt-sm]="{'right': '0px'}"
                 [icon]='rightArrow'
                 (click)='onRightArrow()'
                 tabindex='0'
                 (keyup.enter)='onRightArrow()'>
        </fa-icon>

        <div class='filler'></div>

        <app-book-details *ngIf='selectedBook'
                          [book]='selectedBook'></app-book-details>
    `,
    styleUrls:['./reading-list.component.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements AfterViewInit, OnDestroy {
    leftArrow = faChevronLeft;
    rightArrow = faChevronRight;
    selectedBook:Book;

    @ViewChild('listContainer', {static:false}) listContainer:ElementRef<HTMLElement>;

    scroller:SweetScroll;

    private mouseDownSubscription:Subscription;
    private isScrolled:Boolean = false;

    constructor(public bookService:BookService) {
    }

    ngAfterViewInit() {
        const listContainerEl = this.listContainer.nativeElement;
        this.scroller = new SweetScroll(
            {
                vertical:false,
                horizontal:true,
            },
            listContainerEl
        );

        const up$ = fromEvent(document, 'mouseup').pipe(tap(() => setTimeout(() => this.isScrolled = false, 10)));
        const move$ = fromEvent(document, 'mousemove')
            .pipe(
                takeUntil(up$),
                pluck('clientX'),
                pairwise(),
                map(([p, c]) => (p as number) - (c as number)),
                filter(val => Math.abs(val) > 1)
            );

        const down$ = fromEvent(this.listContainer.nativeElement, 'mousedown');
        this.mouseDownSubscription = down$
            .pipe(
                tap(event => event.preventDefault()),
                mergeMap(() => move$)
            )
            .subscribe(move => {
                this.isScrolled = true;
                this.listContainer.nativeElement.scrollLeft += move;
            });

        setTimeout(() => {
            document.getElementById('current-books').scrollIntoView({
                block:'nearest',
                inline:'center',
                behavior: 'smooth'
            });
        }, 600);
    }

    ngOnChanges(simpleChanges) {
        console.log(simpleChanges);
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

    onSelectBook(book:Book) {
        if (!this.isScrolled) {
            if (this.selectedBook !== book) {
                this.selectedBook = book;
                this.scroller.toElement(document.getElementById(book.title), {
                    offset:-(window.innerWidth / 2) + 60
                });
            } else {
                this.selectedBook = null;
            }
        }
    }
}
