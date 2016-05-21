import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription,  } from 'rxjs/Rx';

import { Session } from '../http/http';
import { Story, StoryService } from './stories';
import { Post, StoryPostService } from '../story-posts/story-posts';
import { BusyModalComponent } from '../shared-components/busy-modal.component';

@Component({
  moduleId: module.id,
  selector: 'create-story',
  templateUrl: 'app/stories/create-story.component.html',
  directives: [BusyModalComponent]
})
export class CreateStoryComponent implements OnInit {
  saving:boolean;
  
  story:Story;
  post:Post;
  
  constructor(
    private storyService:StoryService, 
    private postService:StoryPostService, 
    private router:Router,
    private session:Session
  ) {}

  ngOnInit() {
    if(!this.session.loggedIn){
      this.router.navigate(['/user-authentication', {nextRoute:encodeURIComponent('/create-story')}]);
    }
    
    this.story = {};
    this.post = {};
  }
  
  createStory(){
    if(!this.saving){
      this.saving = true;
      let storyId:number;
      
      let postSubscription = this.storyService.createStory(this.story)
        .switchMap(story => {
          storyId = story.id;
          return this.postService.createPost(storyId, this.post);
        })
        .subscribe(
          () => {
            this.stopSaving(postSubscription);
            this.router.navigate(['/stories', storyId, '/invites']);
          },
          () => {this.stopSaving(postSubscription);}
        )
    }
  }
  
  private stopSaving(postSubscription:Subscription):void{
    this.saving = false;
    postSubscription.unsubscribe();
  }
}