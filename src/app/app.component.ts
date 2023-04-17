import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title;
  constructor(private router: Router){
    this.title = 'simple-login-app';
  }
  ngOnInit() {
    if (localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/welcome']);
    }
   
  }
  
}
