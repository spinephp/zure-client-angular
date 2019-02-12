import { BrowserModule, By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NewsService} from '../news//news.service';
import {LocalStorage} from '../commons/provider/local-storage';
import {ValuesService} from '../commons/service/values.service';
import {Router, ActivatedRoute} from '@angular/router';
import { NewsComponent } from './news.component';
import { TranslatePipe } from '../translate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { NewsData, News } from './classes/news';

const newsdatas: NewsData[] = [
  {
    id: '65',
    titles: ['The new website is formal open-minded', '改制后的新网站正式开通了'],
    contents: ['The new website which it is my company strypped-down is formal open-minded.', '我公司改制后的新网站正式开通了，欢迎新老客户光临访问。'],
    time: '2012-02-28'
  }
];

const fakeActivatedRoute = {
  snapshot: {params: {id: 65}},
  queryParams: of({'id': 0}),
  data: of({data: [new News(newsdatas)]})
};

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let element1;
  let de;
  let translate;
  let vs;
  let hs;
  let router;
  let activeRouter;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule
      ],
      declarations: [
        NewsComponent,
        TranslatePipe,
      ],
      providers: [
        TranslatePipe,
        ValuesService,
        LocalStorage,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        { provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      // schemas: [ NO_ERRORS_SCHEMA ] // 路由至新页面时，忽略组件没加载错误
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NewsComponent);
      component = fixture.componentInstance;
      element1 = fixture.nativeElement;
      de = fixture.debugElement;
      const injector = fixture.debugElement.injector;
      translate = injector.get(TranslatePipe);
      vs = injector.get(ValuesService);
      hs = injector.get(NewsService);
      // router = injector.get(Router);
      // router.initialNavigation();
      // activeRouter = injector.get(ActivatedRoute);
      fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', done => {
    Promise.all(hs.get()).then((rs) => {
      fixture.detectChanges();        // update view with quote
      const allLinks = de.queryAll(By.css('a'));
      const navs: Object[] = rs[0] as Object[];
      console.log(allLinks);
      expect(allLinks.length).toBe(2);
      expect(allLinks[0].childNodes[0].nativeNode.textContent).toBe('News');
      // for (let i = 1; i < links.length; i++) {
      //   expect(links[i].linkParams.toString()).toBe('/' + rs[2][i - 1]['command']);
      // }
      done();
    });
  });
});
