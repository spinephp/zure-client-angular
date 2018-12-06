import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {ValuesService} from './commons/service/values.service';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {SettingsService} from './commons/service/settings.service';
import { NewsComponent } from './news/news.component';
import { HomeResolveService } from './home/home-resolve.service';
import { NewsResolveService } from './news//news-resolve.service';
import { GoodsModule } from './goods/goods.module';
//import { PinyinPipe } from './pinyin.pipe';
// import { UnitPipe } from './unit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // TranslatePipe,
    HomeComponent,
    NewsComponent,
    //PinyinPipe,
    // UnitPipe,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    BrowserModule,
    FormsModule,
    GoodsModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorage,
    SettingsService,
    HomeResolveService,
    NewsResolveService,
    ValuesService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
