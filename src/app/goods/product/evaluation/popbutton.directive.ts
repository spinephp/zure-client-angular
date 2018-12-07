import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPopbutton]'
})
export class PopbuttonDirective {
  static btn;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('mouseenter') onMouseEnter() {
    if ( !PopbuttonDirective.btn) {
      const that = this;
      PopbuttonDirective.btn = document.createElement('button');
      PopbuttonDirective.btn.innerText = 'Reply';
      PopbuttonDirective.btn.style.float = 'right';
      PopbuttonDirective.btn.onclick = (ev) => {
        if (!ev.target.div) {
          const div = document.createElement('div');
          const label = document.createElement('label');
          const input = document.createElement('input');
          const btn = document.createElement('button');
          div.style.clear = 'both';
          div.style.border = '1px solid #ddd';
          div.style.margin = '10px';
          div.style.padding = '10px';
          input.type = 'text';
          label.innerText = 'Reply';
          label.style.display = 'block';
          btn.innerText = 'Reply';
          btn['div'] = div;
          btn.onclick = (eve) => {
            eve.target['div'].remove();
            delete eve.target['div'];
            PopbuttonDirective.btn.remove();
            PopbuttonDirective.btn = null;
          };
          div.appendChild(label);
          div.appendChild(input);
          div.appendChild(btn);
          ev.target.parentElement.append(div);
          ev.target.div = div;
        } else {
          ev.target.div.remove();
          delete ev.target.div;
        }
      };
      this.renderer.appendChild(this.el.nativeElement, PopbuttonDirective.btn);
    }
  }
  @HostListener('mouseleave') onMouseLeave() {
    if (PopbuttonDirective.btn && !PopbuttonDirective.btn.div) {
      PopbuttonDirective.btn.remove();
      PopbuttonDirective.btn = null;
    }
  }
}
