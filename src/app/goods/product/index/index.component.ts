import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SettingsService} from '../../../commons/service/settings.service';
import { LocalStorage } from '../../../commons/provider/local-storage';
import { ValuesService } from '../../../commons/service/values.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private chemicals;
  private physicos;
  private languageid;
  private chemicalshows = ['SiC', 'Si3N4', 'SiO2', 'Si', 'Fe2O3'];
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private cv: SettingsService,
    private vs: ValuesService,
    private ls: LocalStorage) {}

  ngOnInit() {
    const that = this;
    this.languageid = this.ls.getLanguageId();
    this.vs.currentLanguageId().subscribe((value: any) => {
      that.languageid = value;
    });
    this.router.data.subscribe((data) => {
      // data.data.subscribe((rs: {data: any[2]}) => {
        if (data.data[0].length > 0) {
          that.chemicals = data.data[0][0];
          that.physicos = data.data[1];
        } else {
          that.route.navigate([''], {relativeTo: that.router});
        }
        // });
    });
  }
}
