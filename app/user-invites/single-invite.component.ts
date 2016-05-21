import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { Session } from '../http/http';
import { Story, StoryService } from '../stories/stories';
import { StoryInviteService } from '../story-invites/story-invites';
import { Invite, InviteService } from './user-invites';
import { BusyModalComponent } from '../shared-components/busy-modal.component';

@Component({
  moduleId: module.id,
  selector: 'single-invite',
  templateUrl: 'app/user-invites/single-invite.component.html',
  directives: [BusyModalComponent]
})
export class SingleInviteComponent implements OnInit, OnActivate {
  story:Story;
  invite:Invite;
  
  header:string;
  visible:boolean;
  
  constructor(
    private location:Location,
    private router:Router,
    private storyService:StoryService, 
    private inviteService:InviteService,
    private storyInviteService:StoryInviteService,
    private session:Session
  ) {}

  ngOnInit() {
    if(!this.session.loggedIn){
      let nextRoute = decodeURIComponent(this.location.path());
      this.router.navigate(['/user-authentication', {nextRoute: nextRoute}]);
    }
  }
  
  routerOnActivate(curr:RouteSegment){
    let $invite = this.inviteService.getInvite(curr.getParam('inviteToken'))
      .switchMap(invite => {
        this.invite = invite;
        return this.storyService.getStory(invite.story_id);
      })
      .subscribe(
        story => { this.story = story; },
        () => { this.router.navigate(['/invites']); }
      );
  }
  
  acceptInvite(){
    if(!this.visible){
      this.openModal('Accepting Invite');
      
      let acceptSub:Subscription = this.storyInviteService.acceptInvite(this.story.id, this.invite.id)
        .subscribe(() => {
          this.closeModalAndNavigate(acceptSub, ['/stories', this.story.id, '/posts']);
        });
    }
  }
  
  declineInvite(){
    if(!this.visible){
      this.openModal('Declining Invite');
     
      let declineSub:Subscription = this.inviteService.cancelInvite(this.invite.token)
        .subscribe(() => {
          this.closeModalAndNavigate(declineSub, ['/stories']);
        });
    }
  }
  
  private openModal(header:string){
    this.header = header;
    this.visible = true;
  }
  
  private closeModalAndNavigate(sub:Subscription, route:any[]){
    this.visible = false;
    sub.unsubscribe();
    this.router.navigate(route);
  }
}