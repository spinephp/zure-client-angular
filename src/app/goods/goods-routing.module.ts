import {Routes, RouterModule} from '@angular/router';
import {GoodsComponent} from './goods.component';
import {KindsComponent} from './kinds/kinds.component';
import {ProductComponent} from './product/product.component';
import { GoodsResolveService } from './goods-resolve.service';
import {NgModule} from '@angular/core';
import {IntroductionComponent} from './product/introduction/introduction.component';
import {ParamComponent} from './product/param/param.component';
import {IndexComponent} from './product/index/index.component';

const routes: Routes = [
  {
    path: 'products',
    component: GoodsComponent,
    resolve: {data: GoodsResolveService},
    children: [
      {path: '', component: KindsComponent},
      {path: 'kinds/:id', component: KindsComponent},
      {path: 'product/:id', component: ProductComponent, children: [
        {path: '', redirectTo: 'introduction', pathMatch: 'full'},
        {path: 'introduction', component: IntroductionComponent},
        {path: 'param', component: ParamComponent},
        {path: 'index', component: IndexComponent}
          ]}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []

})
export class GoodsRoutingModule { }
