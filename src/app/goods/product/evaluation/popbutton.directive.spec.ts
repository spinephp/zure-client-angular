import { PopbuttonDirective } from './popbutton.directive';
import { Directive, ElementRef, HostListener, Input, Renderer2, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EvaluationService } from './evaluation.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

@Component({
  selector: 'app-container',
  template: `<div appPopbutton>tttt</div>`,
})
export class ContainerComponent {

}

describe('PopbuttonDirective', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  // let directive;
  let des;
  let bareH2;
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [  HttpModule ],
    // providers: [  PopbuttonDirective, ElementRef ],
    declarations: [ ContainerComponent, PopbuttonDirective ],
    schemas:      [ NO_ERRORS_SCHEMA ]  // 用来“浅化”组件测试程序，告诉编译器忽略不认识的元素和属性，这样你不再需要声明无关的组件和指令，
  });
  fixture = TestBed.createComponent(ContainerComponent);
  fixture.detectChanges();
  component = fixture.componentInstance;
  // directive = fixture.debugElement.injector.get(PopbuttonDirective);
 /** 查找所有用到该指令的宿主元素 */
 des = fixture.debugElement.queryAll(By.directive(PopbuttonDirective));
 bareH2 = fixture.debugElement.query(By.css('h2:not([appPopbutton])')); // 没有用到该指令的宿主元素});
});
  it('should create an instance', () => {
    expect(des.length).toBe(1);
  });
});
