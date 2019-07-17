
export class AItem<T> {
    private _item: T;
    get item(): T { return this._item; }
    constructor(data: T) {
        this._item = data;
    }
    public attribute() {
        return Object.keys(this._item as Object);
    }

    value(name: string) {
        let result;
        if (this.attribute().indexOf(name) > -1) {
            result =  this.item[name];
        }
        return result;
    }
}

export abstract class Yrrdb<T, U> {
    protected _data: T[];
    get data(): T[] { return this._data; }
    protected _current: Object;
    constructor(data: U[], aClass) {
        this._data = [];
        for (const rec of data) {
            this._data.push(create<T, U>(aClass, rec));
        }
    }

    public find(id: number): T {
        const cid = +id;
        for (const rec of this._data) {
            if (+rec['item']['id'] === cid) {
            return rec;
            }
        }
        return null;
    }

    public findByAttribute(name: string, value: any): T {
        let result;
        if (name && value && this.data.length > 0) {
            const keys = Object.keys(this.data[0]['item']);
            if (keys.indexOf(name) > -1) {
                const str = value.toString();
                for (const aitem of this.data) {
                    if (aitem['item'][name].toString() === str) {
                        result = aitem;
                        break;
                    }
                }
            }
        }
        return result;
    }

    public findAllByAttribute(name: string, value: any): T[] {
        const result: T[] = [];
        if (name && value && this.data.length > 0) {
            const keys = Object.keys(this.data[0]['item']);
            if (keys.indexOf(name) > -1) {
                const str = value.toString();
                for (const aitem of this.data) {
                    if (aitem['item'][name].toString() === str) {
                        result.push(aitem);
                    }
                }
            }
        }
        return result;
    }
}

function create<T, U>(c: {new(U): T; }, data): T {
    return new c(data);
}

function create1<T>(c: {new(): T; }): T {
    return new c();
}

