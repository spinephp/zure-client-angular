import { Directive, ElementRef, HostListener, Renderer, Input, HostBinding, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appItemResize]'
})
export class ItemResizeDirective implements AfterViewInit {
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostBinding('style.height.px')
  elHeight: number;


  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.resizeWorks();
  }

// tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.resizeWorks();
  }

  private resizeWorks(): void {
    const elImage = this.el.getElementsByTagName('img');
    const img = new Image();
    const that = this;
    const p = this.el.getElementsByTagName('p');
    // const p = div.getElementsByTagName('p');
    img.src = elImage[0].src;
    img.onload = (e) => {
      const rate: number = that.el.clientWidth / 879;
      that.elHeight = +that.el.clientWidth *  img.height / img.width;
      p[0].style.fontSize = 28 * rate + 'px';
      for (let i = 1; i < p.length; i++) {
        p[i].style.fontSize = 16 * rate + 'px';
      }
    };
  }

}
