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
        <span><br>My name is Nathan Strong and I am a software engineer and VFX artist.</span>

        <div *ngIf="showMoreInfo">
          <p>I work at IBM and this is my personal blog.</p>
          <p>I am a full stack engineer and I am especially fond of Node, Python, React, and Angular.</p>
          <p>I am currently fascinated by these topics:</p>
          <ul>
            <li>WebGL and 3D Graphics on the web</li>
            <li>New Browser and JavaScript APIs</li>
            <li>3D Animation Tools</li>
            <li>Node.js</li>
            <li>Developer Tooling</li>
            <li>Productivity Scripting w/ Obisidian and Todoist</li>
            <li>UX Design</li>
            <li>WebAssembly</li>
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
