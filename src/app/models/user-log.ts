export class UserLog {
    public type;
    public userId;
    public timeStamp;
    constructor(){
        this.userId = '';
        this.timeStamp = '';
        this.type = 'login';
    }
    validate(): boolean{
        return true;
    }
}
