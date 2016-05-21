import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Response, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './http';

@Injectable()
export class OneWeekStoryHttpService {
  
  constructor(private http:Http, private authService:AuthenticationService) {}
  
  getRequest<T>(path:string):Observable<T>{
    let requestOptions = new RequestOptions({ method:RequestMethod.Get });
    return this.authService.getAuthenticatedRequest<T>(path, requestOptions);
  }
  
  getAllRequest<T>(path:string, searchParams?:Object):Observable<T[]>{
    let urlParams = this.createUrlParams(searchParams);
    let requestOptions = new RequestOptions({ method:RequestMethod.Get, search:urlParams });
    return this.authService.getAuthenticatedRequest<T[]>(path, requestOptions);
  }
  
  postRequest<T>(path:string, payload:T):Observable<T>{
    let requestOptions = new RequestOptions({ method:RequestMethod.Post, body:JSON.stringify(payload) });
    return this.authService.getAuthenticatedRequest<T>(path, requestOptions);
  }
  
  putRequest<T>(path:string, payload:T):Observable<T>{
    let requestOptions = new RequestOptions({ method:RequestMethod.Put, body:JSON.stringify(payload) });
    return this.authService.getAuthenticatedRequest<T>(path, requestOptions);
  }
  
  deleteRequest<T>(path:string):Observable<boolean>{
    let requestOptions = new RequestOptions({ method:RequestMethod.Delete });
    return this.authService.getAuthenticatedRequest<T>(path, requestOptions)
      .map(() => true)
  }
  
  private createUrlParams(searchParams:Object):URLSearchParams{
    if(!searchParams){
      return new URLSearchParams();
    }
    
    return Object.keys(searchParams)
      .reduce((urlParams:URLSearchParams, param:string) => {
        if(searchParams[param]){
          urlParams.append(param, searchParams[param]);  
        }
        
        return urlParams;
      }, new URLSearchParams());
  }
  
}