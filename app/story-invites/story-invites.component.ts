import { Component, OnInit } from '@angular/core';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { Invite, StoryInviteService } from './story-invites';

@Component({
  moduleId: module.id,
  selector: 'story-invites',
  templateUrl: 'app/story-invites/story-invites.component.html',
  styleUrls: ['app/story-invites/story-invite.css']
})
export class StoryInvitesComponent implements OnInit, OnActivate {
  private storyId:number;
  sending:boolean;
  
  invitesToSend:Invite[];
  pendingInvites:Invite[];
  
  constructor(private storyInviteService:StoryInviteService, private router:Router) { }

  ngOnInit() {
    this.invitesToSend = [{}];
    this.pendingInvites = [];
  }
  
  routerOnActivate(curr:RouteSegment){
    this.storyId = parseInt(curr.getParam('storyId'));
    
    this.storyInviteService.getInvites(this.storyId)
      .subscribe((pendingInvites) => { this.pendingInvites = pendingInvites; })
  }

  cancelInvite(inviteId:number){
    this.storyInviteService.deleteInvite(this.storyId, inviteId)
      .subscribe(() => { this.pendingInvites = this.pendingInvites.filter(invite => invite.id !== inviteId); });
  }

  addInvite(){
    this.invitesToSend.push({});
  }
  
  deleteInvite(index:number){
    this.invitesToSend.splice(index, 1);
  }
  
  sendInvites(){
    if(!this.sending){
      this.sending = true;
      
      let inviteSub:Subscription = this.storyInviteService.sendInvites(this.storyId, this.invitesToSend)
        .subscribe(
          () => {
            this.stopSending(inviteSub);
            this.router.navigate(['/stories', this.storyId, '/posts'])
          },
          () => { this.stopSending(inviteSub); }
        )
    }
  }
  
  private stopSending(inviteSub:Subscription){
    this.sending = false;
    inviteSub.unsubscribe();
  }
}