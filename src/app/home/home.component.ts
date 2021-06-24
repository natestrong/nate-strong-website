import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.scss'],
  template: `
    <app-avatar></app-avatar>
    <div class="headline">
      <h2 class="hi">
        More stuff might go here.
      </h2>
    </div>
  `
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
