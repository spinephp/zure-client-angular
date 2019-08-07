
export class Page<T> {
    private xdata: T[];
    get data(): T[] { return this.xdata; }
    private length = 5;
    private xcurrent = 0;
    get current(): number { return this.xcurrent; }
    set current(n: number) {
        if (n >= 0 && n < this.count()) {
        this.xcurrentData = this.getPage(n);
        }
    }
    private xcurrentData: T[] = [];
    get currentData(): T[] { return this.xcurrentData; }

    constructor(data: T[]) {
        this.xdata = data;
        this.xcurrentData = this.getPage(0);
    }

    public getPage(i: number) {
        let result = [];
        const start = i * this.length;
        if (i > -1 && start < this.data.length) {
            let end = start + this.length;
            if (end > this.data.length) {
                end = this.data.length;
            }
            this.xcurrent = i;
            result = this.data.slice(start, end);
        }
        return result;
    }

    // 计算页数
    public count() {
        return Math.ceil(this.data.length / this.length);
    }

    public first() {
        return this.getPage(0);
    }

    public last() {
        return this.getPage(this.count() - 1);
    }

    public prev() {
        return this.getPage(this.current - 1);
    }

    public next() {
        return this.getPage(this.current + 1);
    }
}
