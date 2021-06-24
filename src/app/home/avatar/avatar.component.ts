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
        <span *ngIf="descriptionLevel > 1">I am a full stack engineer, and I am especially fond of Node, Python, and Angular.</span>
        <span *ngIf="descriptionLevel > 2"><br>I am currently fascinated by these topics:
          <br>&nbsp; • New Browser and JavaScript APIs
          <br>&nbsp; • Serverless
          <br>&nbsp; • Node.js
          <br>&nbsp; • Open Source
          <br>&nbsp; • Developer Tooling
          <br>&nbsp; • JavaScript build tools
          <br>&nbsp; • Compilers
      </span>
      <a *ngIf="descriptionLevel < 3" (click)="onClickMore()">...</a>
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
    this.descriptionLevel++;
  }
}
