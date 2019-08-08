import { Injectable } from '@angular/core';
import { Userlogin } from '../home/classes/userlogin';
import { RequestService } from '../commons/service/request.service';
import { LocalStorage } from '../commons/provider/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private requestService: RequestService,
    private ls: LocalStorage,

  ) { }

  login(model: Userlogin) {
    model.token = this.ls.get('sessionid');
    return this.requestService.post('/woo/index.php?cmd=CheckLogin', JSON.stringify(model)).then(rs => {
      return rs;
    });
  }
}
