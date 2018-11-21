import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(
    private _parent: ProductComponent,
    private router: ActivatedRoute,
    private route: Router,

  ) { }

  ngOnInit() {
    const that = this;
    // this.router.queryParams.subscribe(params => {
    this.router.params.subscribe(params => {
      const id = params.id; // || that._parent.goods[0].id;
      // that.aGoods = that._parent.goods.find(id);
      // that.preNames = that._parent.goodsClass.longNames(that.aGoods.classid);
    });
    // this.route.navigate(['introduction']);
  }

}
