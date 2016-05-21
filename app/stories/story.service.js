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
var http_1 = require('../http/http');
var StoryService = (function () {
    function StoryService(httpService) {
        this.httpService = httpService;
        this.path = 'stories';
    }
    StoryService.prototype.getStory = function (storyId) {
        return this.httpService.getRequest(this.path + "/" + storyId);
    };
    StoryService.prototype.getStories = function (searchParams) {
        return this.httpService.getAllRequest(this.path, searchParams);
    };
    StoryService.prototype.getStoriesByTitle = function (title) {
        return this.getStories({ title: title })
            .map(function (stories) { return stories.filter(function (story) { return story.title.indexOf(title) > -1; }); });
    };
    StoryService.prototype.createStory = function (story) {
        return this.httpService.postRequest(this.path, story);
    };
    StoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.OneWeekStoryHttpService])
    ], StoryService);
    return StoryService;
}());
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map