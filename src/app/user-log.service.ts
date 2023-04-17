import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from './models/login';
import {UserLog} from './models/user-log';
import {CustomResponse} from './models/custom-response';
import { saveAs } from 'file-saver';
@Injectable({
    providedIn: 'root'
})
export class UserLogService {
    private logFileUrl = './assets/user-logs.json';
    constructor(private http: HttpClient) { }

    createLog(userLogs) {
        const blob = new Blob([JSON.stringify(userLogs)], {type : 'application/json'});
        saveAs(blob, 'user-log.json');
    }
    getLogs() {
        return this.http.get(this.logFileUrl);
    }
}

  
