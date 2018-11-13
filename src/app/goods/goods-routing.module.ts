import {Routes, RouterModule} from '@angular/router';
import {GoodsComponent} from './goods.component';
import { GoodsResolveService } from './goods-resolve.service';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'products', component: GoodsComponent, resolve: {data: GoodsResolveService}   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []

})
export class GoodsRoutingModule { }
