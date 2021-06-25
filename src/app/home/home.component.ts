import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.scss'],
  template: `
    <app-avatar></app-avatar>
    <app-reading-list></app-reading-list>
<!--    <div class="headline">-->
<!--      <h2 class="hi" style="font-weight: 200">-->
<!--        More stuff might go here.-->
<!--      </h2>-->
<!--    </div>-->
  `
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
