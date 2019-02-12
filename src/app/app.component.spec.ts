import { BrowserModule, By } from '@angular/platform-browser';
import { Directive, ElementRef, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslatePipe } from './translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorage } from './commons/provider/local-storage';
import { ValuesService } from './commons/service/values.service';
import { HeaderService } from './header.service';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  @HostListener('click', ['$event.target'])
  clicked(target) {
    this.onClick();
  }
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('AppComponent', () => {
  let fixture;
  let component: AppComponent;
  let element1;
  let de;
  let translate;
  let vs;
  let hs;
  let router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpModule
      ],
      declarations: [
        AppComponent,
        TranslatePipe,
        RouterLinkStubDirective
      ],
      providers: [
        TranslatePipe,
        HeaderService,
        ValuesService,
        LocalStorage
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // 路由至新页面时，忽略组件没加载错误
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      element1 = fixture.nativeElement;
      de = fixture.debugElement;
      const injector = fixture.debugElement.injector;
      translate = injector.get(TranslatePipe);
      vs = injector.get(ValuesService);
      hs = injector.get(HeaderService);
      router = injector.get(Router);
      router.initialNavigation();
      fixture.detectChanges();
      });
  }));

  it('should create the app', () => {
    component.languageid = 0;
    expect(component).toBeTruthy();
  });

  it('should show quote after getQuote promise (async)', async(() => {
    // fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(component.qiye).toBeDefined();
      for (const field of ['id', 'names', 'addresses', 'tel', 'fax', 'email', 'qq', 'domain', 'introductions', 'icp']) {
        expect(component.qiye[field]).toBeDefined();
      }
    });
  }));

  it(`should have as company title`, () => {
    fixture.detectChanges();        // update view with quote
    const title = element1.querySelector('#title p');
    expect(title.textContent).toEqual(translate.transform(component.qiye['names']));
    expect(title.textContent).toEqual(component.qiye['names'][component.languageid]);
  });

  it('should have a language select', async(() => {
    spyOn(component, 'selectChangeLanguage');
    fixture.whenStable().then(() => {
      fixture.detectChanges();        // update view with quote
      const s = element1.querySelectorAll('.selectpicker');
      // console.log(s1);
      expect(s).toBeDefined();
      expect(s[0].localName).toBe('select');
      for (let i = 0; i < s[0].length; i++) {
        expect(s[0][i]).toBeDefined();
        expect(s[0][i].localName).toBe('option');
        expect(s[0][i].value).toBe(i + '');
        expect(s[0][i].textContent).toBe(component.languages[i]['name_en']);
      }
    });
  }));

  it('languageid should changed when language select changed', async(() => {
    let i = 0;
    spyOn(vs, 'setLanguageId');
    fixture.detectChanges();        // update view with quote
    // for (i = 0; i < 2; i++) {
      component.selectChangeLanguage(i);
      expect(vs.setLanguageId).toHaveBeenCalled();
      expect(vs.setLanguageId).toHaveBeenCalledWith(i);
      setTimeout(() => {
        expect(+component.languageid).toEqual(i);
      }, 200);

      i = 1;
      component.selectChangeLanguage(i);
      expect(vs.setLanguageId).toHaveBeenCalled();
      expect(vs.setLanguageId).toHaveBeenCalledWith(i);
      setTimeout(() => {
        expect(+component.languageid).toEqual(i);
      }, 400);
  }));

  it('should have a user-icon', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();        // update view with quote
      const s = element1.querySelectorAll('.user-icon');
      expect(s).toBeDefined();
      expect(s[0].localName).toBe('span');
      expect(s[0].textContent).toBe('👤');
    });
  }));

  it('should have a navigation', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();        // update view with quote
      const s = element1.querySelectorAll('.navbar-left');
      // console.log(s);
      expect(s).toBeDefined();
      expect(s[0].localName).toBe('ul');
      expect(s[0].childNodes[0].localName).toBe('li');
      expect(s[0].childNodes[0].childNodes[0].localName).toBe('a');
      expect(s[0].childNodes[0].textContent).toBe('🏠' + translate.transform('Home'));
      expect(s[0].childNodes[1].nodeName).toBe('#comment');
      for (let i = 2; i < s[0].childNodes.length; i++) {
        expect(s[0].childNodes[i].localName).toBe('li');
        expect(s[0].childNodes[i].childNodes[0].localName).toBe('a');
        expect(s[0].childNodes[i].textContent).toBe(translate.transform(component.navigations[i - 2]['names']));
      }
    });
  }));

  it('should have a search box', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();        // update view with quote
      const s = element1.querySelectorAll('.navbar-right');
      // console.log(s);
      expect(s).toBeDefined();
      expect(s[0].localName).toBe('form');
      expect(s[0].childNodes[0].localName).toBe('input');
      expect(s[0].childNodes[0].placeholder).toBe(translate.transform('Search'));
      expect(s[0].childNodes[1].localName).toBe('button');
      expect(s[0].childNodes[1].childNodes[0].localName).toBe('span');
      expect(s[0].childNodes[1].childNodes[0].textContent).toBe('🔍');
    });
  }));

  it('can get RouterLinks from template', done => {
    Promise.all(hs.get()).then((rs) => {
      fixture.detectChanges();        // update view with quote
      const allLinks = de.queryAll(By.directive(RouterLinkStubDirective));
      const links = allLinks.map(linkDe => linkDe.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
      const navs: Object[] = rs[2] as Object[];
      expect(links.length).toBe(navs.length + 1);
      expect(links[0].linkParams.toString()).toBe('/home');
      for (let i = 1; i < links.length; i++) {
        expect(links[i].linkParams.toString()).toBe('/' + rs[2][i - 1]['command']);
      }
      done();
    });
  });

  it('should navigate to "home" immediately', async(() => {
    router.navigate(['home']).then(() => {
      expect(location.pathname.endsWith('/home')).toBe(true);
    }).catch(e => console.log(e));
  }));
});
