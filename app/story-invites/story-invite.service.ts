import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OneWeekStoryHttpService } from '../http/http';

@Injectable()
export class StoryInviteService {
  constructor(private httpService:OneWeekStoryHttpService) { }
  
  acceptInvite(storyId:number, inviteId:number){
    return this.httpService.putRequest(this.getPathWithId(storyId, inviteId), {});
  }
  
  sendInvites(storyId:number, invites:Invite[]):Observable<Invite[]>{
    let invites$:Observable<Invite>[] = invites.map(invite => this.httpService.postRequest(this.getPath(storyId), invite));
    return Observable.forkJoin(invites$).toArray();
  }
  
  getInvites(storyId:number):Observable<Invite[]>{
    return this.httpService.getAllRequest<Invite>(this.getPath(storyId));
  }
  
  deleteInvite(storyId:number, inviteId:number):Observable<boolean>{
    return this.httpService.deleteRequest(this.getPathWithId(storyId, inviteId));
  }
  
  private getPathWithId(storyId:number, inviteId:number){
    return `${this.getPath(storyId)}/${inviteId}`; 
  }
  
  private getPath(storyId:number){
    return `stories/${storyId}/invitations`;
  }
}

export interface Invite{
  id?:number;
  text?:string;
  token?:string;
  storyId?: number;
  email?:string;
}