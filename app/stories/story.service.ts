import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OneWeekStoryHttpService } from '../http/http';

@Injectable()
export class StoryService {
  private path = 'stories';
  constructor(private httpService:OneWeekStoryHttpService) { }

  getStory(storyId:number){
    return this.httpService.getRequest(`${this.path}/${storyId}`);
  }

  getStories(searchParams?:Object):Observable<Story[]>{
    return this.httpService.getAllRequest<Story>(this.path, searchParams);
  }
  
  getStoriesByTitle(title:string):Observable<Story[]>{
    return this.getStories({title: title})
      .map(stories => stories.filter(story => story.title.indexOf(title) > -1))
  }
  
  createStory(story:Story):Observable<Story>{
    return this.httpService.postRequest<Story>(this.path, story);
  }
}

export interface Story{
  id?:number;
  title?:string;
  description?:string;
  user_id?:number;
}