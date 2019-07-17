import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {ValuesService} from '../commons/service/values.service';
import {LocalStorage} from '../commons/provider/local-storage';
import { UnitPipe } from '../unit.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SettingsService} from '../commons/service/settings.service';
import { GoodsResolveService } from './goods-resolve.service';
import { GoodsComponent } from './goods.component';
import { TreeModule } from 'angular-tree-component';
import { GoodsService } from './goods.service';
import { GoodsRoutingModule} from './goods-routing.module';
import { ProductRoutingModule} from './product/product-routing.module';
import { KindsComponent } from './kinds/kinds.component';
import { ProductComponent } from './product/product.component';
import { IntroductionComponent } from './product/introduction/introduction.component';
import { ParamComponent } from './product/param/param.component';
import { IndexComponent } from './product/index/index.component';
import { IndexService } from './product/index//index.service';
import { IndexResolveService } from './product/index//index-resolve.service';
import { EvaluationModule } from './product/evaluation/evaluation.module';
import { TranslatePipe } from '../translate.pipe';
import { ItemResizeDirective } from './product/introduction/item-resize.directive';

@NgModule({
  declarations: [
    UnitPipe,
    GoodsComponent,
    KindsComponent,
    ProductComponent,
    IntroductionComponent,
    ParamComponent,
    IndexComponent,
    ItemResizeDirective,
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    FormsModule,
    GoodsRoutingModule,
    ProductRoutingModule,
    TreeModule.forRoot(),
    EvaluationModule,
    CommonModule
  ],
  providers: [
    LocalStorage,
    SettingsService,
    GoodsResolveService,
    GoodsService,
    IndexService,
    IndexResolveService,
    ValuesService
  ],
  exports: [
    CommonModule,
    TranslatePipe,
    UnitPipe
  ]
})
export class GoodsModule { }
