import { Injectable } from '@angular/core';
import {RequestService} from '../commons/service/request.service';
import {SettingsService} from '../commons/service/settings.service';
import { findNode } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(
    private requestService: RequestService,
    private cv: SettingsService,
  ) {
  }
  findParent(parentid, nodes) {
    for (const node of nodes) {
      if (parseInt(node.id, 10) === parseInt(parentid, 10)) {
        return node;
      } else if (node.children) {
        const findnode = this.findParent(parentid, node.children);
        if (findnode) {return findnode; }
      }
    }
    return null;
  }
  makeTreeNodes(nodes, goodsClass, goods, languageid): [] {
    for (const item of goodsClass) {
      const ci = {id: item.id, name: item.names[languageid], children: []};
      const findnode = this.findParent(item.parentid, nodes);
      if (findnode) {
        findnode.children.push(ci);
      } else {
        nodes.push(ci);
      }
    }
    return this.makeTreeProduct(nodes, goods);
  }
  makeTreeProduct(nodes, products): [] {
    for (const item of products) {
      const ci = {id: 'p' + item.id, name: item.size};
      const findnode = this.findParent(item.classid, nodes);
      if (findnode) {
        if (findnode.children) {
          findnode.children.push(ci);
        } else {
          findnode.children = [ci];
        }
      }
    }
    return nodes;
  }
  setLanguage(language) {
    this.cv.setLanguage(language);
  }
  get() {
    const success = [
      function (data) {
        data.find = function(id) {
          if (id > 0) {
            for (const pn in data) {
              if (parseInt(data[ pn ].id, 10) === id) {
                return data[pn];
              }
            }
          }
          return null;
        };
        data.findByParentId = function(parentid) {
          for (const pn in data) {
            if (data[ pn ].parentid === parentid) {
              return data[pn];
            }
          }
          return null;
        };
        data.parentNames = function(parentid) {
          let name = '根结点';
          const pid = parseInt(parentid, 10);
          const rec = data.findByParentId(pid);
          if (rec != null) {
            name = rec.names;
          }
          return name;
        };
        data.kindNames = function(parentid) {
          let pid = parseInt(parentid, 10);
          let rec = null;
          while (pid > 0) {
            rec = data.find(pid);
            pid = rec.parentid;
          }
          return [rec.names[0].replace('Products', ''), rec.names[1].replace('制品', '')];
        };
        data.longNames = function(id) {
          const rec = data.find(id);
          if (rec != null) {
            const kind = data.kindNames(rec.parentid);
            return [kind[0] + rec.names[0], kind[1] + rec.names[1]];
          }
          return null;
        };
        data.shortNames = function(id) {
          const rec = data.find(id);
          if (rec != null) {
            return rec.names;
          }
          return null;
        };
        return data;
      },

      function (data) {
        return data;
      },

      function (data) {
        data.choose = function(i) {
          // $location.path('/ShowNews').search({id: i});
          this.router.navigate(['ShowNews'], { queryParams: { id: 1 } });
        };
        return data;
      }
    ];
    function error(err) {
      alert('error occured!\n' + err);
    }
    const token = this.cv.sessionid;

    const ps = [
      {'? cmd=ProductClass':
          {
            'filter': JSON.stringify(['id', 'parentid', 'names', 'introductions', 'picture']),
            'token': token
          }
      },
      {'?cmd=Product':
          {
            'filter': JSON.stringify([
              'id', 'classid', 'size', 'length', 'width', 'think',
              'unitlen', 'unitwid', 'unitthi', 'picture', 'unit',
              'sharp', 'weight', 'price', 'returnnow', 'amount',
              'cansale', 'physicoindex', 'chemicalindex'
            ]),
            'token': token
          }
      },
      {'?cmd=Currency':
          {
            'filter': JSON.stringify(['id', 'names', 'abbreviation', 'symbol', 'exchangerate']),
            'token': token
          }
      }
    ];

    const promises = [];
    for(let i in ps) {
      for(var k in ps[i]) {
        promises.push(this.requestService.get(this.cv.baseUrl + k, ps[i][k]).then(success[i], error));
      }
    }
    return promises;
  }
}
