import { Component, OnInit, OnDestroy } from '@angular/core';
import { Control, FORM_DIRECTIVES } from "@angular/common";
import { Router, OnActivate, RouteSegment } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { StoryService, Story } from './stories';

@Component({
  moduleId: module.id,
  selector: 'story-search',
  templateUrl: 'app/stories/story-search.component.html',
  styleUrls: ['app/stories/story-search.component.css'],
  directives: [FORM_DIRECTIVES]
})
export class StorySearchComponent implements OnInit, OnDestroy, OnActivate {
  titleControl:Control = new Control();
  storiesSub:Subscription;
  
  title:string;
  stories:Story[] = [];
  
  constructor(private storyService:StoryService, private router:Router) {
    this.storiesSub = this.titleControl.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap((title:string) => this.storyService.getStoriesByTitle(title))
      .subscribe(stories => {this.stories = stories;} );
  }
  
  routerOnActivate(curr:RouteSegment){
    if(curr.getParam('invite-token')){
      this.router.navigate(['/invites', curr.getParam('invite-token')]);
    } else if(curr.getParam('story-id')){
      this.router.navigate(['/stories', curr.getParam('story-id'), '/posts']);
    }
  }

  ngOnInit() {
    this.title = '';
  }
  
  ngOnDestroy() {
    this.storiesSub.unsubscribe();
  }
  
  gotoStory(storyId:number){
    this.router.navigate(['/stories', storyId, '/posts'])
  }
}