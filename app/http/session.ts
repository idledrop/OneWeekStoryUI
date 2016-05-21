import { Injectable } from '@angular/core';

import { User } from '../user-form/user-form';

@Injectable()
export class Session {
  private _token:string;
  private _loggedIn:boolean;
  private _user:User;
  
  constructor() { }

  get token():string{
    return this._token;
  }
  
  set token(value:string){  
    this._token = value;
    this.setInLocalStorage();
  }
  
  get loggedIn():boolean{
    return this._loggedIn;  
  }
  
  set loggedIn(value:boolean){
    this._loggedIn = value;
    this.setInLocalStorage();
  }
  
  get user():User{
    return this._user;
  }
  
  set user(value:User){
    this._user = value;
    this.setInLocalStorage();
  }
  
  
  clearSession(){
    this._token = null;
    this._loggedIn = null;
    this._user = null;
    localStorage.removeItem('session');
  }
  
  persist(){
    let sessionData = localStorage.getItem('session'); 
    
    if(sessionData !== null){
      let session = JSON.parse(sessionData);
      this._loggedIn = session.loggedIn;
      this._token = session.token;
      this._user = session.user;
    }
  }
  
  private setInLocalStorage(){
    let sessionData = JSON.stringify({token: this._token, loggedIn: this._loggedIn, user: this._user});
    localStorage.setItem('session', sessionData);
  }
}