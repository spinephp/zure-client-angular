import { Component, OnInit } from '@angular/core';
import { GoodsComponent } from '../goods.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private aGoods;
  private preNames;
  private buynum;
  constructor(
    private _parent: GoodsComponent,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.buynum = 1;
   }

  ngOnInit() {
    const that = this;
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id || that._parent.goods[0].id;
      that.aGoods = that._parent.goods.find(id);
      that.preNames = that._parent.goodsClass.longNames(that.aGoods.classid);
    });
    // this.route.navigate(['introduction']);
  }

}
