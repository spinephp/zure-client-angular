import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HeaderService, LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
