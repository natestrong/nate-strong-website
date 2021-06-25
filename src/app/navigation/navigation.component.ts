import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {faGithub, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-navigation',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header fxLayoutAlign="space-around start">
      <a routerLink="/">natestrong.codes</a>
      <ul class="social" fxLayoutAlign="space-between start">
        <a href="https://github.com/natestrong"><fa-icon [icon]="faGithub"></fa-icon></a>
        <a href="https://twitter.com/naughtyphoton"><fa-icon [icon]="faTwitter"></fa-icon></a>
        <a href="https://linkedin.com/in/nathan-strong-engineer"><fa-icon [icon]="faLinkedIn"></fa-icon></a>
      </ul>
    </header>
  `
})
export class NavigationComponent implements OnInit {
  faGithub = faGithub
  faTwitter = faTwitter
  faLinkedIn = faLinkedin


  constructor() {
  }

  ngOnInit(): void {
  }

}
