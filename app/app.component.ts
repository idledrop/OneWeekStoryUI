import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes, Router } from '@angular/router';
import { FORM_PROVIDERS } from '@angular/common';

import { AuthenticationService, OneWeekStoryHttpService, Session  } from './http/http';
import { StoryService, StorySearchComponent, CreateStoryComponent } from './stories/stories';
import { UserService, UserFormComponent } from './user-form/user-form';
import { StoryInviteService, StoryInvitesComponent } from './story-invites/story-invites';
import { StoryPostsComponent, StoryPostService } from './story-posts/story-posts';
import { InviteService, UserInvitesComponent, SingleInviteComponent } from './user-invites/user-invites';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [
    FORM_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS, 
    AuthenticationService, 
    OneWeekStoryHttpService, 
    StoryService,
    Session,
    StoryInviteService,
    UserService,
    StoryPostService,
    InviteService
  ],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path:'/stories/:storyId/posts', component:StoryPostsComponent},
  {path:'/stories/:storyId/invites', component:StoryInvitesComponent},
  {path:'/stories', component:StorySearchComponent},
  {path:'/invites/:inviteToken', component:SingleInviteComponent},
  {path:'/invites', component:UserInvitesComponent},
  {path:'/user-authentication', component:UserFormComponent},
  {path:'/create-story', component:CreateStoryComponent},
  {path: '/', component:StorySearchComponent}
])
export class AppComponent implements OnInit{
  signedIn:boolean;
  
  constructor(private router:Router, private session:Session, private authenticationService:AuthenticationService){}
  
  ngOnInit(){
    this.session.persist();
    
    this.authenticationService.session$
      .subscribe(session => this.signedIn = session.loggedIn);
  }
  
  logOut($event:Event):void{
    this.authenticationService.clearSession();
    this.signedIn = false;
  }
  
  checkAuthentication($event:Event, navigationRoute:string){
    $event.preventDefault();
    
    if(this.session.loggedIn){
      this.router.navigateByUrl(navigationRoute);
    } else {
      this.router.navigate(['/user-authentication', {nextRoute: encodeURIComponent(navigationRoute)}])
    }
  }
}