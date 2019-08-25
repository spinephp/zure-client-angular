import { ItemResizeDirective } from './item-resize.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-product',
  template: '<div appItemResize><img src="../../../../assets/images/N4Si3Patten.jpg" /></div>'
})

class SpyTestComponent {
  // public aGoods;
  // public goodsClass: Kind = new Kind(kinddata);
  public languageid = 1;
  // activeNode(id) {
  // }
}

describe('ItemResizeDirective', () => {
  let component: SpyTestComponent;
  let fixture: ComponentFixture<SpyTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new ItemResizeDirective(fixture.nativeElement);
    expect(directive).toBeTruthy();
  });
});
