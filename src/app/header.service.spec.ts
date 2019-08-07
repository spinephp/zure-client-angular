import { TestBed, inject, async } from '@angular/core/testing';
import { RequestService } from './commons/service/request.service';
import {SettingsService} from './commons/service/settings.service';
import { HeaderService } from './header.service';
import {Http, HttpModule, XHRBackend, BaseRequestOptions } from '@angular/http';
import { LocalStorage } from './commons/provider/local-storage';
import { of } from 'rxjs';
import { CompanyData } from './classes/company';

describe('HeaderService', () => {
  let service: HeaderService;
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

  beforeEach(() => TestBed.configureTestingModule({
    imports: [  HttpModule ],
    providers: [ RequestService, SettingsService, LocalStorage ]
  }));
  beforeEach(inject([HeaderService], s => {
    service = s;
  }));
  it('should be created', () => {
    // service = TestBed.get(HeaderService);
    expect(service).toBeTruthy();
  });

  it('should return available data', async(() => {
    const sRequest = TestBed.get(RequestService);
    const sSetting = TestBed.get(SettingsService);
    const datas = [companydatas, languagedatas, menudatas];
    spyOn(sRequest, '_get').and.callFake(() => {
      return [of(companydatas).toPromise(), of(languagedatas).toPromise(), of(menudatas).toPromise()];
    });
    spyOn(sRequest, 'get').and.callFake(() => {
      return of({data: [{token: '', sessionid: ''}]}).toPromise();
    });
    service.heart().then(res => {

      const sdata = 'data';
      expect(sRequest.get).toHaveBeenCalled();
      expect(sRequest.get).toHaveBeenCalledTimes(1);

      expect(res[sdata][0].token).toBe('');
      expect(res[sdata][0].sessionid).toBe('');

      Promise.all(service.get()).then(rs => {
        // console.log(rs);
        expect(sRequest._get).toHaveBeenCalled();
        expect(sRequest._get).toHaveBeenCalledTimes(1);

        expect(rs.length).toBe(datas.length);
        for (let i = 0; i < datas.length; i++) {
          expect(rs[i].length).toEqual(datas[i].length);
          expect(rs[i]).toEqual(datas[i]);
        }
      });
  });
  }));
});
