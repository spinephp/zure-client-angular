import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { UserGrade } from './user-grade';

export interface GradeData {
    id: string;
    names: string[];
    image: string;
}

export class AGrade extends AItem<GradeData> {
    constructor(data: GradeData) {
        super(data);
    }
}

export class Grade extends Yrrdb<AGrade, GradeData> {

    constructor(data: GradeData[], private usergrade: UserGrade) {
        super(data, AGrade);
    }

    public getByUser = (userid: number) => {
        const item = this.usergrade.findByUserId(userid).item;
        return this.find(+item['gradeid']);
    }
}
