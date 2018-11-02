import { Component, OnInit } from '@angular/core';
import {HeaderService} from './header.service';
import {LocalStorage} from './commons/provider/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderService]
})
export class AppComponent implements OnInit {

  constructor(private headerService: HeaderService, private ls: LocalStorage) {
  }
  title = 'yrr';
  ngOnInit() {
    this.headerService.isFirst().then(res => {
      if (res.ok === true) {
        this.ls.set('publickey', res.data[0].token);
        this.ls.set('sessionid', res.data[0].sessionid);
      } else {
        this.title = res.error;
      }
      });
  }
}
