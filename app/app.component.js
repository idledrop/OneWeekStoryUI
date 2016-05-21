"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var http_2 = require('./http/http');
var stories_1 = require('./stories/stories');
var user_form_1 = require('./user-form/user-form');
var story_invites_1 = require('./story-invites/story-invites');
var story_posts_1 = require('./story-posts/story-posts');
var user_invites_1 = require('./user-invites/user-invites');
var AppComponent = (function () {
    function AppComponent(router, session, authenticationService) {
        this.router = router;
        this.session = session;
        this.authenticationService = authenticationService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.persist();
        this.authenticationService.session$
            .subscribe(function (session) { return _this.signedIn = session.loggedIn; });
    };
    AppComponent.prototype.logOut = function ($event) {
        this.authenticationService.clearSession();
        this.signedIn = false;
    };
    AppComponent.prototype.checkAuthentication = function ($event, navigationRoute) {
        $event.preventDefault();
        if (this.session.loggedIn) {
            this.router.navigateByUrl(navigationRoute);
        }
        else {
            this.router.navigate(['/user-authentication', { nextRoute: encodeURIComponent(navigationRoute) }]);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            providers: [
                common_1.FORM_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                http_2.AuthenticationService,
                http_2.OneWeekStoryHttpService,
                stories_1.StoryService,
                http_2.Session,
                story_invites_1.StoryInviteService,
                user_form_1.UserService,
                story_posts_1.StoryPostService,
                user_invites_1.InviteService
            ],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.Routes([
            { path: '/stories/:storyId/posts', component: story_posts_1.StoryPostsComponent },
            { path: '/stories/:storyId/invites', component: story_invites_1.StoryInvitesComponent },
            { path: '/stories', component: stories_1.StorySearchComponent },
            { path: '/invites/:inviteToken', component: user_invites_1.SingleInviteComponent },
            { path: '/invites', component: user_invites_1.UserInvitesComponent },
            { path: '/user-authentication', component: user_form_1.UserFormComponent },
            { path: '/create-story', component: stories_1.CreateStoryComponent },
            { path: '/', component: stories_1.StorySearchComponent }
        ]), 
        __metadata('design:paramtypes', [router_1.Router, http_2.Session, http_2.AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map