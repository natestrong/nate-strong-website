import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {RouterModule} from "@angular/router";
import { AvatarComponent } from './avatar/avatar.component';
import {FlexModule} from "@angular/flex-layout";
import { ReadingListComponent } from './reading-list/reading-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    AvatarComponent,
    ReadingListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FlexModule
  ]
})
export class HomeModule {
}
