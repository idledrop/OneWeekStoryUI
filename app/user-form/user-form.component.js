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
var primeng_1 = require('primeng/primeng');
var user_form_1 = require('./user-form');
var http_1 = require('../http/http');
var UserFormComponent = (function () {
    function UserFormComponent(userService, router, authenticationService) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userEmailControl = new common_1.Control();
        this.userEmailSubscription = this.userEmailControl.valueChanges
            .debounceTime(600)
            .distinctUntilChanged()
            .switchMap(function (email) { return _this.userService.getUserByEmail(email); })
            .subscribe(function (user) { _this.user.id = user && user.id; });
    }
    UserFormComponent.prototype.ngOnInit = function () {
        this.user = {};
    };
    UserFormComponent.prototype.ngOnDestroy = function () {
        this.userEmailSubscription.unsubscribe();
    };
    UserFormComponent.prototype.routerOnActivate = function (curr) {
        this.nextRoute = decodeURIComponent(curr.getParam('nextRoute'));
    };
    UserFormComponent.prototype.handleUser = function () {
        var _this = this;
        var user$;
        if (this.user.id) {
            user$ = this.authenticationService.login(this.user.email, this.user.password);
        }
        else {
            user$ = this.userService.createUser(this.user)
                .switchMap(function () { return _this.authenticationService.login(_this.user.email, _this.user.password); });
        }
        var userSub = user$.subscribe(function (user) { _this.router.navigateByUrl(_this.nextRoute); });
    };
    UserFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-form',
            templateUrl: 'app/user-form/user-form.component.html',
            directives: [primeng_1.Password]
        }), 
        __metadata('design:paramtypes', [user_form_1.UserService, router_1.Router, http_1.AuthenticationService])
    ], UserFormComponent);
    return UserFormComponent;
}());
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map