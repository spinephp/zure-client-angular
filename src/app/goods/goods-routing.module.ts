import {Routes, RouterModule} from '@angular/router';
import {GoodsComponent} from './goods.component';
import {KindsComponent} from './kinds/kinds.component';
import {ProductComponent} from './product/product.component';
import { GoodsResolveService } from './goods-resolve.service';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'products',
    component: GoodsComponent,
    resolve: {data: GoodsResolveService},
    children: [
      // {path: '', component: KindsComponent},
      {path: 'kinds', component: KindsComponent},
      {path: 'product', component: ProductComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []

})
export class GoodsRoutingModule { }
