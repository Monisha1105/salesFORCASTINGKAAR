import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { LoginService } from '../login.service';
import { CustomResponse } from '../models/custom-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: Login;
  public loginError: boolean;
  public showPassword: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.login = new Login();
    this.loginError = false;
    this.showPassword = false;
  }

  ngOnInit(): void {
  }

  userLogin() {
    this.router.navigate(['/sales']);
  }
}
