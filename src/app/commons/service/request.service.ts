import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: Http, private ss: SettingsService) { }

  /**
   * 统一发送请求
   * @param params
   * @returns {Promise<{success: boolean, msg: string}>|Promise<R>}
  public request(params: any): any {
    if (params['method'] === 'post' || params['method'] === 'POST') {
      return this.post(params['url'], params['data']);
    } else {
      return this.get(params['url'], params['data']);
    }
  }
   */

  getUrl(cmd: string, filter: string[], condition: Object[] = null) {
    const url = {};
    const cmdstr = `?cmd=${cmd}`;
    const data = {'token': this.ss.sessionid};
    if (filter && filter.length > 0) {
      data['filter'] = JSON.stringify(filter);
    }
    if (condition && condition.length > 0) {
      data['cond'] = JSON.stringify(condition);
    }
    url[cmdstr] = data;
    return url;
  }

  _get(param) {
    function success(data) {
      return data;
    }

    function error(err) {
      alert('error occured!\n' + err);
    }
    const promises = [];
    for (const i of Object.keys(param)) {
      for (const k of Object.keys(param[i])) {
        promises.push(this.get(this.ss.baseUrl + k, param[i][k]).then(success, error));
      }
    }
    return promises;
  }

  /**
   * get请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public get(url: string, params: any): any {
    return this.http.get(url, {search: params})
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(res => this.handleError(res));
  }

  /**
   * post请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
  public post(url: string, params: any) {
    return this.http.post(url, params)
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(res => this.handleError(res));
  }
   */

  /**
   * 处理请求成功
   * @param res
   * @returns {{data: (string|null|((node:any)=>any)
   */
  private handleSuccess(value: Response) {
      return value;
  }

  /**
   * 处理请求错误
   * @param error
   * @returns {void|Promise<string>|Promise<T>|any}
   */
  private handleError(error): Promise<any> {
    /**console.log(error);
    const msg = '请求失败';
    if (error.status === 400) {
      console.log('请求参数正确');
    }
    if (error.status === 404) {

      console.error('请检查路径是否正确');
    }
    if (error.status === 500) {
      console.error('请求的服务器错误');
    }*/
    return Promise.reject({success: false, error: error.message});

  }
}
