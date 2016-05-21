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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('../http/http');
var StoryInviteService = (function () {
    function StoryInviteService(httpService) {
        this.httpService = httpService;
    }
    StoryInviteService.prototype.acceptInvite = function (storyId, inviteId) {
        return this.httpService.putRequest(this.getPathWithId(storyId, inviteId), {});
    };
    StoryInviteService.prototype.sendInvites = function (storyId, invites) {
        var _this = this;
        var invites$ = invites.map(function (invite) { return _this.httpService.postRequest(_this.getPath(storyId), invite); });
        return Observable_1.Observable.forkJoin(invites$).toArray();
    };
    StoryInviteService.prototype.getInvites = function (storyId) {
        return this.httpService.getAllRequest(this.getPath(storyId));
    };
    StoryInviteService.prototype.deleteInvite = function (storyId, inviteId) {
        return this.httpService.deleteRequest(this.getPathWithId(storyId, inviteId));
    };
    StoryInviteService.prototype.getPathWithId = function (storyId, inviteId) {
        return this.getPath(storyId) + "/" + inviteId;
    };
    StoryInviteService.prototype.getPath = function (storyId) {
        return "stories/" + storyId + "/invitations";
    };
    StoryInviteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.OneWeekStoryHttpService])
    ], StoryInviteService);
    return StoryInviteService;
}());
exports.StoryInviteService = StoryInviteService;
//# sourceMappingURL=story-invite.service.js.map