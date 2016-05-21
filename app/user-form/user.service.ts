import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OneWeekStoryHttpService } from '../http/http';

@Injectable()
export class UserService {
  path:string = 'users';
  
  constructor(private httpService:OneWeekStoryHttpService) { }
  
  getUserByEmail(email:string):Observable<User>{
    return this.httpService.getAllRequest<User>(this.path, {email:email})
      .map(users => {
        let usersWithoutEmail = users.filter(user => user.email === email);
        return usersWithoutEmail[0] || {};
      });
  }
  
  createUser(user:User):Observable<User>{
    return this.httpService.postRequest<User>(this.path, user);
  }
}

export interface User{
  id?:number;
  email?:string,
  username?:string,
  password?:string
}