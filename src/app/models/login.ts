export class Login {
    public email;
    public password;
    constructor(){
        this.email = '';
        this.password = '';
    }
    validate(): boolean{
        if (this.email === '' || this.password === ''){
            return false;
        }
        return true;
    }
}
