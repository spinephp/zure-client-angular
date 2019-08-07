export class Userlogin {
    public repwd: string;
    public email: string;
    constructor(
        public username: string,
        public pwd: string,
        public code: string,
        public action: string,
        public token: string
    ) {
        this.repwd = null;
        this.email = null;
    }
}
