import { BrowserModule, By } from '@angular/platform-browser';
import { Directive, ElementRef, HostListener, Input, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
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
import { of } from 'rxjs';
import { CompanyData } from './classes/company';

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
  const companydatas: CompanyData[] = [
  {
    id: '1',
    addresses: ['12 Taishan Road,Lianyungang Eco. &amp; Tech. Developme', '江苏连云港经济技术开发区泰山路12号'],
    domain: 'http://www.yrr8.com',
    email: 'admin@yrr8.com',
    fax: '+86 518 82340137',
    icp: '苏ICP备1201145号',
    introductions: [
      'YunRui refractories co., LTD is a manufacturer specialized ',
      '　　连云港云瑞耐火材料有限公司系生产碳化硅耐火制品的专业厂家，年生产能力2000吨'
    ],
    names: ['LIANYUNGANG YUNRUI REFRACTORY CO,.LTD', '连云港云瑞耐火材料有限公司'],
    qq: '2531841386',
    tel: '+86 518 82340137'
  }
];
const languagedatas = [
  {id: '1', name_en: 'english'},
  {id: '2', name_en: 'chinese'}
];
const menudatas = [
  {id: '6', names: ['News', '企业新闻'], command: 'news'},
  {id: '7', names: ['Products', '产品中心'], command: 'products'},
  {id: '8', names: ['Contact Us', '联系我们'], command: 'ShowContactUs'},
  {id: '9', names: ['My yunrui', '我的云瑞'], command: 'Member'},
  {id: '10', names: ['Leave word', '在线留言'], command: 'ShowLeaveMessage'}
];

const logindatas = {ok: true, data: [{
  login: true,
  token: '-----BEGIN PUBLIC KEY-----↵123456ANBgkqhkiG9w0BAQE…6aZ5I1SEKppSw1↵3wIDAQAB↵-----END PUBLIC KEY-----↵',
  sessionid: 'j12345662bv34crvothcb1q0rj'
}]};

@Injectable()
export class StubHeaderService {
  public heart(): Promise<Object> {
    return of(logindatas).toPromise();
  }
  public get() {
    return [of(companydatas).toPromise(), of(languagedatas).toPromise(), of(menudatas).toPromise()];
  }
}

describe('AppComponent', () => {
  let fixture;
  let component: AppComponent;
  let element1;
  let de;
  let translate;
  let vs;
  let hs: HeaderService;
  let ls;
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
        ValuesService,
        LocalStorage,
        { provide: HeaderService, useClass: StubHeaderService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ] // 路由至新页面时，忽略组件没加载错误
    }).compileComponents().then(() => {
      // hs = TestBed.get(HeaderService, StubHeaderService);
      ls = TestBed.get(LocalStorage);
      spyOn(ls, 'set').and.callThrough();
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      element1 = fixture.nativeElement;
      de = fixture.debugElement;
      const injector = fixture.debugElement.injector;
      translate = injector.get(TranslatePipe);
      vs = injector.get(ValuesService);
      spyOn(vs, 'setQiye').and.callThrough();
      hs = injector.get(HeaderService);
      spyOn(hs, 'heart').and.callFake(() => {
        return of(logindatas).toPromise();
      });
      spyOn(hs, 'get').and.callFake(() => {
        return [of(companydatas).toPromise(), of(languagedatas).toPromise(), of(menudatas).toPromise()];
      });
      spyOn(component, 'selectChangeLanguage').and.callThrough();
      // ls = injector.get(LocalStorage);
      router = injector.get(Router);
      router.initialNavigation();
      fixture.detectChanges();
      });
  }));
  // beforeEach(inject([HeaderService], s => {
  //   hs = s;
  // }));

  it('should create the app', () => {
    component.languageid = 0;
    expect(component).toBeTruthy();
  });

  it('should show quote after getQuote promise (async)', async(() => {
    // fixture.detectChanges();
    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote
      expect(hs.heart).toHaveBeenCalled();
      expect(hs.heart).toHaveBeenCalledTimes(1);
      expect(hs.get).toHaveBeenCalled();
      expect(hs.get).toHaveBeenCalledTimes(1);

      expect(ls.set).toHaveBeenCalled();
      expect(ls.set).toHaveBeenCalledTimes(4);
      expect(ls.set).toHaveBeenCalledWith('publickey', logindatas.data[0].token);
      expect(ls.set).toHaveBeenCalledWith('sessionid', logindatas.data[0].sessionid);
      expect(ls.set).toHaveBeenCalledWith('qq', companydatas[0].qq);
      expect(ls.set).toHaveBeenCalledWith('languageid', component.languageid);

      expect(vs.setQiye).toHaveBeenCalled();
      expect(vs.setQiye).toHaveBeenCalledTimes(1);
      expect(vs.setQiye).toHaveBeenCalledWith(companydatas[0]);

      expect(component.selectChangeLanguage).toHaveBeenCalled();
      expect(component.selectChangeLanguage).toHaveBeenCalledTimes(1);

      expect(component.qiye).toBe(companydatas[0]);
    });
  }));

  it(`should have as company title`, () => {
    fixture.detectChanges();        // update view with quote
    const title = element1.querySelector('#title p');
    expect(title.textContent).toEqual(translate.transform(component.qiye['names']));
    expect(title.textContent).toEqual(component.qiye['names'][component.languageid]);
  });

  it('should have a language select', async(() => {
    // spyOn(component, 'selectChangeLanguage');
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
    hs.heart().then(res => {
      fixture.detectChanges();        // update view with quote
      expect(res).toBe(logindatas);
      done();
    });
  });

  it('can get RouterLinks from template', done => {
    Promise.all(hs.get()).then((rs) => {
      fixture.detectChanges();        // update view with quote
      expect(rs.length).toBe(3);
      expect(rs[0]).toBe(companydatas);
      expect(rs[1]).toBe(languagedatas);
      expect(rs[2]).toBe(menudatas);

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

  it('should navigate to home immediately', async(() => {
    router.navigate(['home']).then(() => {
      expect(location.pathname.endsWith('/home')).toBe(true);
    }).catch(e => console.log(e));
  }));
});
