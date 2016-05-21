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
var common_1 = require("@angular/common");
var router_1 = require('@angular/router');
var stories_1 = require('./stories');
var StorySearchComponent = (function () {
    function StorySearchComponent(storyService, router) {
        var _this = this;
        this.storyService = storyService;
        this.router = router;
        this.titleControl = new common_1.Control();
        this.stories = [];
        this.storiesSub = this.titleControl.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(function (title) { return _this.storyService.getStoriesByTitle(title); })
            .subscribe(function (stories) { _this.stories = stories; });
    }
    StorySearchComponent.prototype.routerOnActivate = function (curr) {
        if (curr.getParam('invite-token')) {
            this.router.navigate(['/invites', curr.getParam('invite-token')]);
        }
        else if (curr.getParam('story-id')) {
            this.router.navigate(['/stories', curr.getParam('story-id'), '/posts']);
        }
    };
    StorySearchComponent.prototype.ngOnInit = function () {
        this.title = '';
    };
    StorySearchComponent.prototype.ngOnDestroy = function () {
        this.storiesSub.unsubscribe();
    };
    StorySearchComponent.prototype.gotoStory = function (storyId) {
        this.router.navigate(['/stories', storyId, '/posts']);
    };
    StorySearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'story-search',
            templateUrl: 'app/stories/story-search.component.html',
            styleUrls: ['app/stories/story-search.component.css'],
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [stories_1.StoryService, router_1.Router])
    ], StorySearchComponent);
    return StorySearchComponent;
}());
exports.StorySearchComponent = StorySearchComponent;
//# sourceMappingURL=story-search.component.js.map