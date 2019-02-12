import { Yrrdb, AItem } from '../../../../commons/provider/yrrdb';
import { _getViewData } from '@angular/core/src/render3/instructions';

export interface LabelData {
    id: string;
    names: string[];
}

export class ALabel extends AItem<LabelData> {
    constructor(data: LabelData) {
        super(data);
    }
}

export class Label extends Yrrdb<ALabel, LabelData> {

    constructor(data: LabelData[]) {
        super(data, ALabel);
    }
}
