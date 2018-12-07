import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationComponent } from './evaluation.component';
import { EvaluationService } from './evaluation.service';
import { TranslatePipe } from '../../../translate.pipe';
import { PinyinPipe } from '../../../pinyin.pipe';
import { PopbuttonDirective } from './popbutton.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    EvaluationService
  ],
  exports: [
    TranslatePipe,
    PinyinPipe,
    EvaluationComponent
  ],
  declarations: [
    TranslatePipe,
    PinyinPipe,
    EvaluationComponent,
    PopbuttonDirective
  ]
})
export class EvaluationModule { }
