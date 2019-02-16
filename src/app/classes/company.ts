import { Yrrdb, AItem } from 'src/app/commons/provider/yrrdb';

export interface CompanyData {
    id: string;
    names: string[];
    addresses: string[];
    tel: string;
    fax: string;
    email: string;
    qq: string;
    domain: string;
    introductions: string[];
    icp: string;
}

export class ACompany extends AItem<CompanyData> {
    constructor(data: CompanyData) {
        super(data);
    }
}

export class Company  extends Yrrdb<ACompany, CompanyData> {
    constructor(data: CompanyData[]) {
        super(data, ACompany);
    }
}
