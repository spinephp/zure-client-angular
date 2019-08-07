import { AItem } from 'src/app/commons/provider/yrrdb';

export interface LoginerData {
    id: string;
    name: string;
    active: string;
    email: string;
    picture: string;
    state: number;
    time?: string;
}

export class ALoginer extends AItem<LoginerData> {
    constructor(data: LoginerData) {
        super(data);
    }
}
