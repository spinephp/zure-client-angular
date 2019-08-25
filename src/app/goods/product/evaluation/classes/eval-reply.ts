import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { User, UserData, AUser } from './user';
import { ItemResizeDirective } from '../../introduction/item-resize.directive';

export interface EvalReplyData {
    id: string;
    evalid: number;
    userid: number;
    parentid: number;
    content: string;
    time: string;
    username?: string;
    preusername?: string;
}

export class AEvalReply extends AItem<EvalReplyData> {
  static user: User;
  constructor(data: EvalReplyData) {
    super(data);
  }

  extends() {
    this.item.username = this.getUserName(this.item.userid);
    this.item.preusername = this.getUserName(this.item.parentid);
  }

  private getUserName(userid: number) {
    let result;
    const user0 = AEvalReply.user.find(userid);
    if (user0) {
      result = user0.getName();
    }
    return result;
  }
}

export class EvalReply extends Yrrdb<AEvalReply, EvalReplyData> {

  constructor(data: EvalReplyData[], user: User) {
    AEvalReply.user = user;
    super(data, AEvalReply);
  }

  add(item: EvalReplyData, user: AUser) {
    if (AEvalReply.user.find(user.value('id')) !== null) {
      AEvalReply.user.data.push(user);
    }
    this.append(item, AEvalReply);
  }
}
