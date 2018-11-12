import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { GoodsComponent } from './goods/goods.component';
import { HomeResolveService } from './home/home-resolve.service';
import { NewsResolveService } from './news/news-resolve.service';
import { GoodsResolveService } from './goods/goods-resolve.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: {data: HomeResolveService}},
  { path: 'news', component: NewsComponent, resolve: {data: NewsResolveService} },
  { path: 'products', component: GoodsComponent, resolve: {data: GoodsResolveService} },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
