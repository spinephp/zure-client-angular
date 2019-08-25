
export class AItem<T> {
    private xitem: T;
    get item(): T { return this.xitem; }
    constructor(data: T) {
        this.xitem = data;
    }
    public attribute() {
        return Object.keys(this.xitem as unknown as object);
    }

    value(name: string) {
        let result: any = null;
        if (this.item !== null && this.attribute().indexOf(name) > -1) {
            result =  this.item[name];
        }
        return result;
    }
}

export abstract class Yrrdb<T, U> {
    protected xdata: T[];
    get data(): T[] { return this.xdata; }
    protected xcurrent: object;
    private sitem: string;
    constructor(data: U[], aClass: new (U: any) => T) {
        this.xdata = [];
        for (const rec of data) {
            this.xdata.push(create<T, U>(aClass, rec));
        }
        this.sitem = 'item';
    }

    public find(id: number): T {
        const cid = +id;
        for (const rec of this.xdata) {
            if (+rec[this.sitem].id === cid) {
            return rec;
            }
        }
        return null;
    }

    public findByAttribute(name: string, value: any): T {
        let result: T;
        if (name && value && this.data.length > 0) {
            const keys = Object.keys(this.data[0][this.sitem]);
            if (keys.indexOf(name) > -1) {
                const str = value.toString();
                for (const aitem of this.data) {
                    if (aitem[this.sitem][name].toString() === str) {
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
            const keys = Object.keys(this.data[0][this.sitem]);
            if (keys.indexOf(name) > -1) {
                const str = value.toString();
                for (const aitem of this.data) {
                    if (aitem[this.sitem][name].toString() === str) {
                        result.push(aitem);
                    }
                }
            }
        }
        return result;
    }

    public append(item: U, aClass: new (U: any) => T) {
        this.xdata.push(create<T, U>(aClass, item));
    }
}

function create<T, U>(c: new(U: any) => T, data: U): T {
    return new c(data);
}

function create1<T>(c: new() => T): T {
    return new c();
}

