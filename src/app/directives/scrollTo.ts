import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[scrollTo]'
})
export class ScrollTo implements OnChanges {

  @Input('scrollTo') scrollTo: boolean = false;

  constructor(
    private el: ElementRef,
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollTo.currentValue !== changes.scrollTo.previousValue) {
      if (changes.scrollTo.currentValue === true) {
        this.el.nativeElement.scrollIntoView({
          behaviour: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }

}
