import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule
  ],
  providers: [
    RegisterService
  ]
})
export class RegisterModule { }
