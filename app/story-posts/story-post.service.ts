import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { OneWeekStoryHttpService } from '../http/http';

@Injectable()
export class StoryPostService {
  constructor(private httpService:OneWeekStoryHttpService) { }

  createPost(storyId:number, post:Post):Observable<Post>{
    return this.httpService.postRequest<Post>(this.getPath(storyId), post);
  }
  
  private getPath(storyId:number):string{
    return `stories/${storyId}/posts`;
  }
}

export interface Post{
  id?:number,
  user_id?:number,
  story_id?:number,
  content?:string
}