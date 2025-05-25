import { Component } from '@angular/core';
import { LoginInComponent } from "../login-in/login-in.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contaioner-auth',
  imports:  [
    LoginInComponent,
     SignUpComponent,
     NgIf],
  templateUrl: './contaioner-auth.component.html',
  styleUrl: './contaioner-auth.component.css'
})
export class ContaionerAuthComponent {
  activeTab: 'register' | 'login' ='register' ;

  setTab(tab: 'login' | 'register') {
    console.log(this.activeTab)
    this.activeTab = tab;
    console.log(this.activeTab)
  }
}
