import { Component, OnInit, OnDestroy } from '@angular/core';
import { Control } from '@angular/common';
import { OnActivate, RouteSegment, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';

import { Password } from 'primeng/primeng';

import { User, UserService } from './user-form';
import { AuthenticationService } from '../http/http';

@Component({
  moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'app/user-form/user-form.component.html',
  directives: [Password]
})
export class UserFormComponent implements OnInit, OnActivate, OnDestroy {
  private userEmailSubscription:Subscription;
  
  userEmailControl:Control = new Control();
  user:User;
  nextRoute:string;
  
  constructor(
    private userService:UserService, 
    private router:Router, 
    private authenticationService:AuthenticationService
  ) {
    this.userEmailSubscription =  this.userEmailControl.valueChanges
      .debounceTime(600)
      .distinctUntilChanged()
      .switchMap(email => this.userService.getUserByEmail(email))
      .subscribe(user =>{ this.user.id = user && user.id; });
  }
  
  ngOnInit() {
    this.user = {};
  }
  
  ngOnDestroy(){
    this.userEmailSubscription.unsubscribe();
  }
  
  routerOnActivate(curr:RouteSegment){
    this.nextRoute = decodeURIComponent(curr.getParam('nextRoute'));
  }
  
  handleUser(){
    let user$:Observable<User>;
    
    if(this.user.id){
      user$ =  this.authenticationService.login(this.user.email, this.user.password)
    } else {
      user$ =  this.userService.createUser(this.user)
        .switchMap(() => this.authenticationService.login(this.user.email, this.user.password));
    }
    
    let userSub:Subscription = user$.subscribe(user => { this.router.navigateByUrl(this.nextRoute)});
  }
}