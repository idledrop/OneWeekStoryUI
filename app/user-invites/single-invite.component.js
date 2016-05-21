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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var http_1 = require('../http/http');
var stories_1 = require('../stories/stories');
var story_invites_1 = require('../story-invites/story-invites');
var user_invites_1 = require('./user-invites');
var busy_modal_component_1 = require('../shared-components/busy-modal.component');
var SingleInviteComponent = (function () {
    function SingleInviteComponent(location, router, storyService, inviteService, storyInviteService, session) {
        this.location = location;
        this.router = router;
        this.storyService = storyService;
        this.inviteService = inviteService;
        this.storyInviteService = storyInviteService;
        this.session = session;
    }
    SingleInviteComponent.prototype.ngOnInit = function () {
        if (!this.session.loggedIn) {
            var nextRoute = decodeURIComponent(this.location.path());
            this.router.navigate(['/user-authentication', { nextRoute: nextRoute }]);
        }
    };
    SingleInviteComponent.prototype.routerOnActivate = function (curr) {
        var _this = this;
        var $invite = this.inviteService.getInvite(curr.getParam('inviteToken'))
            .switchMap(function (invite) {
            _this.invite = invite;
            return _this.storyService.getStory(invite.story_id);
        })
            .subscribe(function (story) { _this.story = story; }, function () { _this.router.navigate(['/invites']); });
    };
    SingleInviteComponent.prototype.acceptInvite = function () {
        var _this = this;
        if (!this.visible) {
            this.openModal('Accepting Invite');
            var acceptSub_1 = this.storyInviteService.acceptInvite(this.story.id, this.invite.id)
                .subscribe(function () {
                _this.closeModalAndNavigate(acceptSub_1, ['/stories', _this.story.id, '/posts']);
            });
        }
    };
    SingleInviteComponent.prototype.declineInvite = function () {
        var _this = this;
        if (!this.visible) {
            this.openModal('Declining Invite');
            var declineSub_1 = this.inviteService.cancelInvite(this.invite.token)
                .subscribe(function () {
                _this.closeModalAndNavigate(declineSub_1, ['/stories']);
            });
        }
    };
    SingleInviteComponent.prototype.openModal = function (header) {
        this.header = header;
        this.visible = true;
    };
    SingleInviteComponent.prototype.closeModalAndNavigate = function (sub, route) {
        this.visible = false;
        sub.unsubscribe();
        this.router.navigate(route);
    };
    SingleInviteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'single-invite',
            templateUrl: 'app/user-invites/single-invite.component.html',
            directives: [busy_modal_component_1.BusyModalComponent]
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.Router, stories_1.StoryService, user_invites_1.InviteService, story_invites_1.StoryInviteService, http_1.Session])
    ], SingleInviteComponent);
    return SingleInviteComponent;
}());
exports.SingleInviteComponent = SingleInviteComponent;
//# sourceMappingURL=single-invite.component.js.map