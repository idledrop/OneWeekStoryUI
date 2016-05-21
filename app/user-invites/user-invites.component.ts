import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';

import { Invite, InviteService } from './user-invites';
import { Story, StoryService } from '../stories/stories';
import { StoryInviteService } from '../story-invites/story-invites';
import { BusyModalComponent } from '../shared-components/busy-modal.component';

@Component({
  moduleId: module.id,
  selector: 'user-invites',
  templateUrl: 'app/user-invites/user-invites.component.html',
  directives:[BusyModalComponent]
})
export class UserInvitesComponent implements OnInit {
  visible:boolean;
  header:string;
  loadingInvites:boolean;
  stories:Story[];
  invites:Invite[];
  
  constructor(private inviteService:InviteService, private storyService:StoryService, private storyInviteService:StoryInviteService) { }

  ngOnInit() {
    this.loadingInvites = true;
    this.stories = [];
    
    let invites$:Observable<Invite[]> = this.inviteService.getInvites()
      .map(invites => invites === null ? [] : invites)
      .map(invites => invites.length === undefined ? [invites] : invites);
      
    let stories$:Observable<Story[]> = this.storyService.getStories();
    
    let storySub:Subscription = Observable.forkJoin(invites$, stories$)
      .map(([invites, stories]) => {
        this.invites = invites;
        
        return stories.filter((story:Story) => {
          return invites.some((invite:Invite) => invite.story_id === story.id)
        });
      }).subscribe(stories => {
        this.stories = stories;
        this.loadingInvites = false;
        storySub.unsubscribe();
      });
  }
  
  acceptInvite(storyId:number){
    if(!this.visible){
      this.openModal('Accepting Invite');
      let invite = this.findInviteByStoryId(storyId);
      
      let acceptSub:Subscription = this.storyInviteService.acceptInvite(storyId, invite.id)
        .subscribe(() => {
          this.closeModal(acceptSub, ['/stories', storyId, '/posts']);
        });
    }
  }
  
  declineInvite(storyId:number){
    if(!this.visible){
      this.openModal('Declining Invite');
      let invite = this.findInviteByStoryId(storyId);
     
      let declineSub:Subscription = this.inviteService.cancelInvite(invite.token)
        .subscribe(() => {
          this.closeModal(declineSub, ['/stories']);
        });
    }
  }
  
  private findInviteByStoryId(storyId:number){
    return this.invites.find(invite => invite.story_id === storyId);
  }
  
  private openModal(header:string){
    this.header = header;
    this.visible = true;
  }
  
  private closeModal(sub:Subscription, route:any[]){
    this.visible = false;
    sub.unsubscribe();
  }
}