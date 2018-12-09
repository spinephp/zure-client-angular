import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { EvaluationService } from './evaluation.service';
@Directive({
  selector: '[appPopbutton]'
})
export class PopbuttonDirective {
  static btn;
  static that;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private es: EvaluationService
    ) { }
  @HostListener('mouseenter') onMouseEnter() {
    if ( !PopbuttonDirective.btn) {
      const that = this;
      PopbuttonDirective.btn = document.createElement('button');
      PopbuttonDirective.btn.innerText = 'Reply';
      PopbuttonDirective.btn.style.margin = '0 5px 0 0';
      PopbuttonDirective.btn.onclick = (ev) => {
        if (!ev.target.div) {
          const div = document.createElement('div');
          const label = document.createElement('label');
          const input = document.createElement('input');
          const btn = document.createElement('button');
          div.style.width = '90%';
          div.style.border = '1px solid #ddd';
          div.style.margin = '5px';
          div.style.padding = '10px';
          input.type = 'text';
          input.style.width = '88%';
          label.innerText = 'Reply';
          label.style.display = 'block';
          btn.innerText = 'Reply';
          btn.style.margin = '0 0 0 10px';
          btn['div'] = div;
          btn.onclick = (eve) => {
            // that.es.postreply({evalid:parentid: this.parentElement.id})
            eve.target['div'].remove();
            delete eve.target['div'];
            PopbuttonDirective.btn.remove();
            PopbuttonDirective.btn = null;
          };
          div.appendChild(label);
          div.appendChild(input);
          div.appendChild(btn);
          ev.target.parentElement.parentElement.append(div);
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
