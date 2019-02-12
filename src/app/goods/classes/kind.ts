import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';
import { isNumber } from 'util';

export interface KindData {
    id: string;
    parentid: number;
    names: string[];
    introductions: string[];
    picture: string;
}

export class AKind extends AItem<KindData> {
    constructor(data: KindData) {
        super(data);
    }
}

export class Kind extends Yrrdb<AKind, KindData> {
    constructor(data: KindData[]) {
        super(data, AKind);
    }

    findByParentId(parentid) {
        for (const akind of this.data) {
          if (+akind.item.id === parentid) {
            return akind;
          }
        }
        return null;
    }

    parentNames(parentid) {
        const pid = +parentid;
        if ( isNumber(parentid)) {
          let name = ['Root Node', '根结点'];
          const akind = this.find(pid);
          if (akind != null) {
            name = akind.item.names;
          }
          return name;
        } else {
          return [];
        }
    }

    names(parentid) {
        let pid = +parentid;
        if (isNumber(parentid) && pid > 0) {
          let akind = null;
          while (pid > 0) {
            akind = this.find(pid);
            pid = akind.item.parentid;
          }
          return akind.item.names ? [akind.item.names[0].replace('Products', ''), akind.item.names[1].replace('制品', '')] : null;
        } else {
          return null;
        }
    }

    longNames(id) {
        const akind = this.find(id);
        if (akind != null) {
          const kind = this.names(akind.item.parentid);
          return kind ? [kind[0] + akind.item.names[0], kind[1] + akind.item.names[1]] : akind.item.names;
        }
        return null;
    }

    shortNames(id) {
        const akind = this.find(id);
        if (akind != null) {
          return akind.item.names;
        }
        return null;
    }
}
