import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';
import {ValuesService} from '../commons/service/values.service';
import {LocalStorage} from '../commons/provider/local-storage';
import { TranslatePipe } from '../translate.pipe';
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

@NgModule({
  declarations: [
    TranslatePipe,
    GoodsComponent,
    KindsComponent,
    ProductComponent,
    IntroductionComponent,
    ParamComponent,
    IndexComponent
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
    CommonModule
  ],
  providers: [
    LocalStorage,
    SettingsService,
    GoodsResolveService,
    GoodsService,
    ValuesService
  ],
  exports: [
    CommonModule,
    TranslatePipe
  ]
})
export class GoodsModule { }
