import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {HeaderService} from './header.service';

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
  providers: [HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
