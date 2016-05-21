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
var http_1 = require('../http/http');
var stories_1 = require('./stories');
var story_posts_1 = require('../story-posts/story-posts');
var busy_modal_component_1 = require('../shared-components/busy-modal.component');
var CreateStoryComponent = (function () {
    function CreateStoryComponent(storyService, postService, router, session) {
        this.storyService = storyService;
        this.postService = postService;
        this.router = router;
        this.session = session;
    }
    CreateStoryComponent.prototype.ngOnInit = function () {
        if (!this.session.loggedIn) {
            this.router.navigate(['/user-authentication', { nextRoute: encodeURIComponent('/create-story') }]);
        }
        this.story = {};
        this.post = {};
    };
    CreateStoryComponent.prototype.createStory = function () {
        var _this = this;
        if (!this.saving) {
            this.saving = true;
            var storyId_1;
            var postSubscription_1 = this.storyService.createStory(this.story)
                .switchMap(function (story) {
                storyId_1 = story.id;
                return _this.postService.createPost(storyId_1, _this.post);
            })
                .subscribe(function () {
                _this.stopSaving(postSubscription_1);
                _this.router.navigate(['/stories', storyId_1, '/invites']);
            }, function () { _this.stopSaving(postSubscription_1); });
        }
    };
    CreateStoryComponent.prototype.stopSaving = function (postSubscription) {
        this.saving = false;
        postSubscription.unsubscribe();
    };
    CreateStoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-story',
            templateUrl: 'app/stories/create-story.component.html',
            directives: [busy_modal_component_1.BusyModalComponent]
        }), 
        __metadata('design:paramtypes', [stories_1.StoryService, story_posts_1.StoryPostService, router_1.Router, http_1.Session])
    ], CreateStoryComponent);
    return CreateStoryComponent;
}());
exports.CreateStoryComponent = CreateStoryComponent;
//# sourceMappingURL=create-story.component.js.map