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
import { KindsComponent } from './kinds/kinds.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    TranslatePipe,
    GoodsComponent,
    KindsComponent,
    ProductComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpModule,
    JsonpModule,
    FormsModule,
    GoodsRoutingModule,
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
