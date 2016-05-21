import { Component, OnInit } from '@angular/core';

import { OnActivate, RouteSegment } from '@angular/router';

import { StoryService } from '../stories/stories';

@Component({
  moduleId: module.id,
  selector: 'story-posts',
  templateUrl: 'app/story-posts/story-posts.component.html'
})
export class StoryPostsComponent implements OnInit, OnActivate {
  story:Story;
   
  constructor(private storyService:StoryService) {
    
  }

  ngOnInit() { }
  
  routerOnActivate(curr:RouteSegment){
    let storyId:number = parseInt(curr.getParam('storyId'));
    
    this.storyService.getStory(storyId)
      .subscribe(story => this.story = story);
  }
}