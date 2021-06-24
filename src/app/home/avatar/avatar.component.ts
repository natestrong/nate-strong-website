import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <section fxLayout="row" fxLayoutGap="12px" fxLayoutAlign="start center">
      <img src="assets/me.jpeg" alt="a picture of me">
      <p class="description">
        Hello, friends!
        <span>My name is Nathan Strong and I am a software engineer.</span>
        <span *ngIf="descriptionLevel > 0">I work at Sony Pictures Animation and this is my personal blog.</span>
        <span *ngIf="descriptionLevel > 1">I am a full stack engineer and I am especially fond of Node, Python, and Angular.</span>
        <span *ngIf="descriptionLevel > 2"><br>I am currently fascinated by these topics:
          <br>&nbsp; •&nbsp; New Browser and JavaScript APIs
          <br>&nbsp; •&nbsp; Serverless
          <br>&nbsp; •&nbsp; Node.js
          <br>&nbsp; •&nbsp; Open Source
          <br>&nbsp; •&nbsp; Developer Tooling
          <br>&nbsp; •&nbsp; WebGL
          <br>&nbsp; •&nbsp; WebAssembly
          <br>&nbsp; •&nbsp; Algorithms and Data Structures
      </span>
        <a (click)="onClickMore()">{{descriptionLevel < 3 ? '...' : '../'}}</a>
      </p>
    </section>
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  descriptionLevel = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickMore() {
    if (this.descriptionLevel < 3) {
      this.descriptionLevel++;
    } else {
      this.descriptionLevel = 0;
    }
  }
}
