import { Directive, ElementRef, HostListener, Input, Renderer2, HostBinding } from '@angular/core';
import { EvaluationService } from './evaluation.service';
import { ValuesService } from 'src/app/commons/service/values.service';
import { isDefined } from '@angular/compiler/src/util';
import { TranslatePipe } from 'src/app/translate.pipe';
import { isEmpty, map } from 'rxjs/operators';
import { LoginerData } from 'src/app/classes/loginer';
@Directive({
  selector: '[appPopbutton]'
})
export class PopbuttonDirective {
  static btn;
  static that;
  static loginer = '';
   constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private vs: ValuesService,
    private es: EvaluationService,
    private pp: TranslatePipe
    ) {
      this.vs.currentLoginer()
      .pipe( map(item => (item !== undefined ) ? item.id : ''))
      .subscribe(( rs: string) => { PopbuttonDirective.loginer = rs; });
    }

  @HostBinding('attr.data-id')
  ids: string;

  @HostListener('mouseenter', ['$event.target']) onMouseEnter(evt) {
    if ( !PopbuttonDirective.btn) {
      const that = this;
      const ids = evt.id;
      const id2 = ids.split(',');
      PopbuttonDirective.btn = document.createElement('button');
      PopbuttonDirective.btn.innerText = this.pp.transform('Reply');
      // PopbuttonDirective.btn.style.margin = '0 5px 0 0';
      // PopbuttonDirective.btn.style.height = '30px';
      PopbuttonDirective.btn.style = 'align-self:flex-end;height:30px;margin:0 5px 5px 0';
      PopbuttonDirective.btn.class = 'btn btn-primary';
      PopbuttonDirective.btn.disabled = PopbuttonDirective.loginer === '';
      PopbuttonDirective.btn.onclick = (ev) => {
        if (!ev.target.div) {
          const div = document.createElement('div');
          // const label = document.createElement('label');
          const input = document.createElement('input');
          const btn = document.createElement('button');
          const sdiv = 'div';
          const sreplyid = 'replayid';
          div.className = 'reply-box';
          div.style.width = '90%';
          div.style.border = '1px solid #ddd';
          div.style.margin = '5px';
          div.style.padding = '10px';
          input.type = 'text';
          input.style.width = '88%';
          // label.innerText = that.pp.transform('Reply');
          // label.style.display = 'block';
          btn.innerText = that.pp.transform('Submit');
          btn.style.margin = '0 0 0 10px';
          btn[sdiv] = div;
          btn[sreplyid] = evt.id;
          btn.onclick = (eve) => {
            const content = eve.target[sdiv].getElementsByTagName('input')[0].value; // childNodes[1].value;

            if (!content.trim().isEmpty) {
              that.es.postEvalReply(id2[0], id2[1], content).then(rs => {
                if (rs.id === -1) {
                  alert(rs.error);
                } else {
                  alert('Reply success!');
                  this.es.setEvalReply(rs);
                  eve.target[sdiv].remove();
                  delete eve.target[sdiv];
                  PopbuttonDirective.btn.remove();
                  PopbuttonDirective.btn = null;
                }
              });
            }
          };
          // div.appendChild(label);
          div.appendChild(input);
          div.appendChild(btn);
          ev.target.parentElement.parentElement.append(div);
          ev.target.div = div;
          input.select();
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
