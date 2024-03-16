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
          <span>Hi friends!</span>
          <span><br>I'm Nathan Strong, the Series Pipeline Supervisor at Sony Pictures Animation.</span>

          <div *ngIf="showMoreInfo">
            <p>Formerly a Software Engineer at IBM and a Creative Specialist at Foundry, I blend software engineering with visual effects artistry. This is my personal blog where I share my explorations and insights.</p>
            <p>Here's what's currently capturing my imagination:</p>
            <ul>
              <li>Universal Scene Description (USD)</li>
              <li>Apple Vision Framework and Pro Apps</li>
              <li>NVIDIA Omniverse</li>
              <li>WebGL and 3D Graphics on the Web</li>
              <li>New Browser and JavaScript APIs</li>
              <li>3D Animation Tools</li>
              <li>UX Design</li>
            </ul>
            <p>Check out my side project <a href="https://StoryTwin.com" target="_blank">StoryTwin.com</a>, where I'm blending narrative scripts with 3D environments using generative AI.</p>
          </div>

          <a (click)="showMoreInfo = !showMoreInfo;" class="more-info-button">
            <fa-icon [icon]="showMoreInfo ? upArrow : downArrow"></fa-icon>
            {{ showMoreInfo ? 'less about me' : 'more about me' }}
            <fa-icon [icon]="showMoreInfo ? upArrow : downArrow"></fa-icon>
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
