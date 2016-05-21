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
var stories_1 = require('../stories/stories');
var StoryPostsComponent = (function () {
    function StoryPostsComponent(storyService) {
        this.storyService = storyService;
    }
    StoryPostsComponent.prototype.ngOnInit = function () { };
    StoryPostsComponent.prototype.routerOnActivate = function (curr) {
        var _this = this;
        var storyId = parseInt(curr.getParam('storyId'));
        this.storyService.getStory(storyId)
            .subscribe(function (story) { return _this.story = story; });
    };
    StoryPostsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'story-posts',
            templateUrl: 'app/story-posts/story-posts.component.html'
        }), 
        __metadata('design:paramtypes', [stories_1.StoryService])
    ], StoryPostsComponent);
    return StoryPostsComponent;
}());
exports.StoryPostsComponent = StoryPostsComponent;
//# sourceMappingURL=story-posts.component.js.map