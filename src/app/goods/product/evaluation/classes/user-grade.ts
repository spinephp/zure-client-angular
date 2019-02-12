import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { EvalReply } from './eval-reply';

export interface UserGradeData {
    id: string;
    userid: number;
    gradeid: number;
}

export class AUserGrade extends AItem<UserGradeData> {
    constructor(data: UserGradeData) {
        super(data);
    }
}

export class UserGrade extends Yrrdb<AUserGrade, UserGradeData> {
    constructor(data: UserGradeData[]) {
        super(data, AUserGrade);
    }

    public findByUserId(userid: number): AUserGrade {
        let replys = null;
        for (const rp of this._data) {
          if (+rp.item.userid === userid) {
            replys = rp;
            break;
          }
        }
        return replys;
    }
}
