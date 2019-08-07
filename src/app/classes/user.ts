import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface UserData {
    id: string;
    name: string;
}

export class AUser extends AItem<UserData> {
    constructor(data: UserData) {
        super(data);
    }
}

export class User  extends Yrrdb<AUser, UserData> {
    constructor(data: UserData[]) {
        super(data, AUser);
    }
}
