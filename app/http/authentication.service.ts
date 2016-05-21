import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Session } from './http';
import { User } from '../user-form/user-form';

@Injectable()
export class AuthenticationService {
  session$:BehaviorSubject<Session>;
  baseUrl:string = 'https://evening-badlands-77092.herokuapp.com';
  authenticationRequest$:Observable<User>
  headers:Headers;
  
  constructor(private http:Http, private session:Session) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.session$ = new BehaviorSubject(session);
  }
  
  login(email:string, password:string, guestLogin:boolean=false):Observable<User>{
    return this.http.post(`${this.baseUrl}/tokens`, JSON.stringify({email:email, password:password}), {headers: this.headers})
          .map((res:Response) => {
            let extractedData = this.extractData(res); 
            let token = extractedData.token;
            
            this.session.token = token;
            this.session.loggedIn = !guestLogin;
            this.session.user = extractedData.user;
            
            this.session$.next(this.session);
            
            this.headers.set('X-Authorization', token);
            this.authenticationRequest$ = undefined;
            
            return extractedData.user;
          })
          .catch(this.handleError);
  }
  
  getAuthenticatedRequest<T>(path:string, requestOptions:RequestOptions):Observable<T>{
    let url = `${this.baseUrl}/${path}`;
    
    if(!this.headers.has('X-Authorization')){
      if(this.session.token){
        this.headers.set('X-Authorization', this.session.token);
      } else if(!this.authenticationRequest$){
        this.authenticationRequest$ = this.login('guest', 'guest', true);
      }
    }
    
    if(this.authenticationRequest$){
      return this.authenticationRequest$
        .switchMap(() => this.getRequestWithHeaders<T>(url, requestOptions));
    } else {
      return this.getRequestWithHeaders<T>(url, requestOptions);
    }
  }
  
  clearSession(){
    this.headers.delete('X-Authorization');
    this.session.clearSession();
    this.session$.next(this.session);
  }
  
  private getRequestWithHeaders<T>(url:string, requestOptions:RequestOptions):Observable<T>{
    requestOptions.headers = this.headers;
    return this.http.request(url, requestOptions)
      .map(res => <T>this.extractData(res));
  }
  
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
     
    return res.status === 204 ? '' : res.json();
  }
  
  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}