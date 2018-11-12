import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {ValuesService} from './commons/service/values.service';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';
import { TranslatePipe } from './translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {SettingsService} from './commons/service/settings.service';
import { NewsComponent } from './news/news.component';
import { HomeResolveService } from './home/home-resolve.service';
import { NewsResolveService } from './news//news-resolve.service';
import { GoodsResolveService } from './goods//goods-resolve.service';
import { GoodsComponent } from './goods/goods.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HomeComponent,
    NewsComponent,
    GoodsComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    BrowserModule,
    FormsModule,
    TreeModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    LocalStorage,
    SettingsService,
    HomeResolveService,
    NewsResolveService,
    GoodsResolveService,
    ValuesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
