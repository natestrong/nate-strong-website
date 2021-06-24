import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <section fxLayout="row" fxLayoutGap="12px" fxLayoutAlign="start center" >
      <img src="assets/me.jpeg" alt="a picture of me">
      <p>
        Hello, friends!
        <br>My name is Nathan Strong and I am a software engineer.
        <br>I work at Sony Pictures Animation and this is my personal blog.
      </p>
    </section>
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
