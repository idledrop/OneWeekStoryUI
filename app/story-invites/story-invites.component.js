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
var router_1 = require('@angular/router');
var story_invites_1 = require('./story-invites');
var StoryInvitesComponent = (function () {
    function StoryInvitesComponent(storyInviteService, router) {
        this.storyInviteService = storyInviteService;
        this.router = router;
    }
    StoryInvitesComponent.prototype.ngOnInit = function () {
        this.invitesToSend = [{}];
        this.pendingInvites = [];
    };
    StoryInvitesComponent.prototype.routerOnActivate = function (curr) {
        var _this = this;
        this.storyId = parseInt(curr.getParam('storyId'));
        this.storyInviteService.getInvites(this.storyId)
            .subscribe(function (pendingInvites) { _this.pendingInvites = pendingInvites; });
    };
    StoryInvitesComponent.prototype.cancelInvite = function (inviteId) {
        var _this = this;
        this.storyInviteService.deleteInvite(this.storyId, inviteId)
            .subscribe(function () { _this.pendingInvites = _this.pendingInvites.filter(function (invite) { return invite.id !== inviteId; }); });
    };
    StoryInvitesComponent.prototype.addInvite = function () {
        this.invitesToSend.push({});
    };
    StoryInvitesComponent.prototype.deleteInvite = function (index) {
        this.invitesToSend.splice(index, 1);
    };
    StoryInvitesComponent.prototype.sendInvites = function () {
        var _this = this;
        if (!this.sending) {
            this.sending = true;
            var inviteSub_1 = this.storyInviteService.sendInvites(this.storyId, this.invitesToSend)
                .subscribe(function () {
                _this.stopSending(inviteSub_1);
                _this.router.navigate(['/stories', _this.storyId, '/posts']);
            }, function () { _this.stopSending(inviteSub_1); });
        }
    };
    StoryInvitesComponent.prototype.stopSending = function (inviteSub) {
        this.sending = false;
        inviteSub.unsubscribe();
    };
    StoryInvitesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'story-invites',
            templateUrl: 'app/story-invites/story-invites.component.html',
            styleUrls: ['app/story-invites/story-invite.css']
        }), 
        __metadata('design:paramtypes', [story_invites_1.StoryInviteService, router_1.Router])
    ], StoryInvitesComponent);
    return StoryInvitesComponent;
}());
exports.StoryInvitesComponent = StoryInvitesComponent;
//# sourceMappingURL=story-invites.component.js.map