import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from './product.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {ParamComponent} from './param/param.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class ProductRoutingModule { }
