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
var Rx_1 = require('rxjs/Rx');
var user_invites_1 = require('./user-invites');
var stories_1 = require('../stories/stories');
var story_invites_1 = require('../story-invites/story-invites');
var busy_modal_component_1 = require('../shared-components/busy-modal.component');
var UserInvitesComponent = (function () {
    function UserInvitesComponent(inviteService, storyService, storyInviteService) {
        this.inviteService = inviteService;
        this.storyService = storyService;
        this.storyInviteService = storyInviteService;
    }
    UserInvitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingInvites = true;
        this.stories = [];
        var invites$ = this.inviteService.getInvites()
            .map(function (invites) { return invites === null ? [] : invites; })
            .map(function (invites) { return invites.length === undefined ? [invites] : invites; });
        var stories$ = this.storyService.getStories();
        var storySub = Rx_1.Observable.forkJoin(invites$, stories$)
            .map(function (_a) {
            var invites = _a[0], stories = _a[1];
            _this.invites = invites;
            return stories.filter(function (story) {
                return invites.some(function (invite) { return invite.story_id === story.id; });
            });
        }).subscribe(function (stories) {
            _this.stories = stories;
            _this.loadingInvites = false;
            storySub.unsubscribe();
        });
    };
    UserInvitesComponent.prototype.acceptInvite = function (storyId) {
        var _this = this;
        if (!this.visible) {
            this.openModal('Accepting Invite');
            var invite = this.findInviteByStoryId(storyId);
            var acceptSub_1 = this.storyInviteService.acceptInvite(storyId, invite.id)
                .subscribe(function () {
                _this.closeModal(acceptSub_1, ['/stories', storyId, '/posts']);
            });
        }
    };
    UserInvitesComponent.prototype.declineInvite = function (storyId) {
        var _this = this;
        if (!this.visible) {
            this.openModal('Declining Invite');
            var invite = this.findInviteByStoryId(storyId);
            var declineSub_1 = this.inviteService.cancelInvite(invite.token)
                .subscribe(function () {
                _this.closeModal(declineSub_1, ['/stories']);
            });
        }
    };
    UserInvitesComponent.prototype.findInviteByStoryId = function (storyId) {
        return this.invites.find(function (invite) { return invite.story_id === storyId; });
    };
    UserInvitesComponent.prototype.openModal = function (header) {
        this.header = header;
        this.visible = true;
    };
    UserInvitesComponent.prototype.closeModal = function (sub, route) {
        this.visible = false;
        sub.unsubscribe();
    };
    UserInvitesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-invites',
            templateUrl: 'app/user-invites/user-invites.component.html',
            directives: [busy_modal_component_1.BusyModalComponent]
        }), 
        __metadata('design:paramtypes', [user_invites_1.InviteService, stories_1.StoryService, story_invites_1.StoryInviteService])
    ], UserInvitesComponent);
    return UserInvitesComponent;
}());
exports.UserInvitesComponent = UserInvitesComponent;
//# sourceMappingURL=user-invites.component.js.map