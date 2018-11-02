import { Injectable } from '@angular/core';
import {LocalStorage} from '../provider/local-storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private ls: LocalStorage) { }
  baseUrl = 'http://192.168.1.16/woo/index.php';
  // baseUrl = 'http://127.0.0.1/woo/index.php';
  languageid = this.ls.get('languageid') || 1;
}
