import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {RouterModule} from "@angular/router";
import {AvatarComponent} from './avatar/avatar.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {ReadingListComponent} from './reading-list/reading-list.component';
import {BookComponent} from './reading-list/book/book.component';
import {ScrollTo} from "../directives/scrollTo";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BookDetailsComponent } from './reading-list/book-details/book-details.component';


@NgModule({
  declarations: [
    AvatarComponent,
    BookComponent,
    HomeComponent,
    ReadingListComponent,
    ScrollTo,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FlexModule,
    FontAwesomeModule,
    ExtendedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
