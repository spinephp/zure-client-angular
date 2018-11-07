import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';
import { TranslatePipe } from './translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    HomeComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HeaderService, HomeService, LocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule {
     public curLanguage = 'chinese';
}
