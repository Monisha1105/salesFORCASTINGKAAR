import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login.service';
import {UserLogService} from './user-log.service';
import { SalesForecastComponent } from './sales-forecast/sales-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SalesForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule ,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: 'login', component: LoginComponent},    
      { path: 'sales', component: SalesForecastComponent},

     
    ])   
  ],
  providers: [LoginService, UserLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
