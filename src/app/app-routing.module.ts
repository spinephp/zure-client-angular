import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { HomeResolveService } from './home/home-resolve.service';
import { NewsResolveService } from './news/news-resolve.service';

export const rootroutes: Routes = [
  { path: 'home', component: HomeComponent, resolve: {data: HomeResolveService}},
  { path: 'news', component: NewsComponent, resolve: {data: NewsResolveService} },
  { path: 'products', loadChildren: './goods/goods.module#GoodsModule'},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(rootroutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
