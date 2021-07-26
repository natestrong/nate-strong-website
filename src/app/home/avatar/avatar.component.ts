import {ChangeDetectionStrategy, Component} from '@angular/core';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-avatar',
  template: `
    <section>
      <div fxLayout="row" fxLayoutGap="12px" fxLayoutAlign="start start">
        <img src="assets/me.jpeg" alt="a picture of me">
        <span>
        <span>Hello, friends!</span>
        <span><br>My name is Nathan Strong and I am a software engineer.</span>

        <div *ngIf="showMoreInfo">
          <p>I work at Sony Pictures Animation and this is my personal blog.</p>
          <p>I am a full stack engineer and I am especially fond of Node, Python, and Angular.</p>
          <p>I am currently fascinated by these topics:</p>
          <ul>
            <li>New Browser and JavaScript APIs</li>
            <li>Serverless</li>
            <li>Node.js</li>
            <li>Developer Tooling</li>
            <li>UX Design</li>
            <li>WebGL</li>
            <li>WebAssembly</li>
            <li>Algorithms and Data Structures</li>
          </ul>
        </div>

        <a (click)="showMoreInfo = !showMoreInfo;" class="more-info-button">
          <fa-icon [icon]="showMoreInfo ? upArrow: downArrow"></fa-icon>
          {{showMoreInfo ? 'less about me' : 'more about me'}}
          <fa-icon [icon]="showMoreInfo ? upArrow: downArrow"></fa-icon>
        </a>
      </span>
      </div>
    </section>
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  showMoreInfo: boolean = true;
  downArrow: IconDefinition = faChevronDown;
  upArrow: IconDefinition = faChevronUp;
}
