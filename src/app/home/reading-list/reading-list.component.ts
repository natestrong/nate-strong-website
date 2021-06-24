import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-reading-list',
  template: `
    <p>
      reading-list works!
    </p>
  `,
  styleUrls: ['./reading-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
