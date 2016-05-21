import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OneWeekStoryHttpService } from '../http/http';

@Injectable()
export class InviteService {
  path:string = 'invitations';
  
  constructor(private httpService:OneWeekStoryHttpService) {}
  
  getInvite(inviteToken:string):Observable<Invite>{
    return this.httpService.getRequest<Invite>(this.getPathById(inviteToken));
  }
  
  getInvites():Observable<Invite[]>{
    return this.httpService.getAllRequest<Invite>(this.path);
  }
  
  cancelInvite(inviteToken:string){
    return this.httpService.deleteRequest<Invite>(this.getPathById(inviteToken));
  }
  
  private getPathById(inviteToken:string){
    return `${this.path}/${inviteToken}`;
  }
}

export interface Invite{
  id?:number,
  story_id?:number,
  email?:string,
  token?:string
}