import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from './product.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {ParamComponent} from './param/param.component';
import {IndexComponent} from './index/index.component';
import { IndexResolveService } from './index/index-resolve.service';
import { ParamResolveService } from './param/param-resolve.service';
import { ProductResolveService } from './product-resolve.service';

export const productRoutes: Routes = [
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: {data: ProductResolveService},
    children: [
      {path: '', redirectTo: 'introduction', pathMatch: 'full'},
      {path: 'introduction', component: IntroductionComponent},
      {
        path: 'param',
        component: ParamComponent,
        resolve: {data: ParamResolveService}
      },
      {
        path: 'index',
        component: IndexComponent,
        resolve: {data: IndexResolveService}
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class ProductRoutingModule { }
