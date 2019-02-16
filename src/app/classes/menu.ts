import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface MenuData {
    id: string;
    names: string[];
    command: string;
}

export class AMenu extends AItem<MenuData> {
    constructor(data: MenuData) {
        super(data);
    }
}

export class Menu  extends Yrrdb<AMenu, MenuData> {
    constructor(data: MenuData[]) {
        super(data, AMenu);
    }
}
