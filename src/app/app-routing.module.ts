import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { HomeResolveService } from './home/home-resolve.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, resolve: {data: HomeResolveService}},
  { path: 'news', component: NewsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
