
export class Page<T> {
    private _data: T[];
    get data(): T[] { return this._data; }
    private length = 5;
    private _current = 0;
    get current(): number { return this._current; }
    set current(n: number) {
        if (n >= 0 && n < this.count()) {
        this._currentData = this.getPage(n);
        }
    }
    private _currentData: T[] = [];
    get currentData(): T[] { return this._currentData; }

    constructor(data: T[]) {
        this._data = data;
        this._currentData = this.getPage(0);
    }

    public getPage(i: number) {
        let result = [];
        const start = i * this.length;
        if (i > -1 && start < this.data.length) {
            let end = start + this.length;
            if (end > this.data.length) {
                end = this.data.length;
            }
            this._current = i;
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
