import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.scss'],
  template: `
    <app-avatar></app-avatar>
    <app-reading-list></app-reading-list>
    <div class="headline">
      <h2 class="hi" style="font-weight: 200">
        First blog post coming soon
      </h2>
        <h3>In the meantime, check out
            <a href='https://www.npmjs.com/package/firestore-logger'>
                this open source project I am working on
            </a>
        </h3>
    </div>
  `
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
