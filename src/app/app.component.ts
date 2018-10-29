import { Component, OnInit } from '@angular/core';
import {HeaderService} from './header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HeaderService]
})
export class AppComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }
  title = 'yrr';
  ngOnInit() {
    this.headerService.isFirst().then(res => {
      if (res.success) {
        this.title = 'success';
      } else {
        this.title = res.error;
      }
      });
  }
}
