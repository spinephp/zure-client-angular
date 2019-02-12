import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface NewsData {
    id: string;
    titles: string[];
    contents: string[];
    time: string;
}

export class ANews extends AItem<NewsData> {
    constructor(data: NewsData) {
        super(data);
    }
}

export class News  extends Yrrdb<ANews, NewsData> {
    constructor(data: NewsData[]) {
        super(data, ANews);
    }
}
