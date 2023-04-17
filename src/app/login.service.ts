import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Login} from './models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpClient,private router: Router) { }

  login(login: Login) {
    const data = {email : login.email, password : login.password};
    return this.http.post(`https://testwallet.angelium.net/api/jwt/api-token-auth/`, data);
    this.router.navigate(['/home']);
  }
}