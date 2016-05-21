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
var http_2 = require('./http');
var OneWeekStoryHttpService = (function () {
    function OneWeekStoryHttpService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    OneWeekStoryHttpService.prototype.getRequest = function (path) {
        var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get });
        return this.authService.getAuthenticatedRequest(path, requestOptions);
    };
    OneWeekStoryHttpService.prototype.getAllRequest = function (path, searchParams) {
        var urlParams = this.createUrlParams(searchParams);
        var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Get, search: urlParams });
        return this.authService.getAuthenticatedRequest(path, requestOptions);
    };
    OneWeekStoryHttpService.prototype.postRequest = function (path, payload) {
        var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, body: JSON.stringify(payload) });
        return this.authService.getAuthenticatedRequest(path, requestOptions);
    };
    OneWeekStoryHttpService.prototype.putRequest = function (path, payload) {
        var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Put, body: JSON.stringify(payload) });
        return this.authService.getAuthenticatedRequest(path, requestOptions);
    };
    OneWeekStoryHttpService.prototype.deleteRequest = function (path) {
        var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Delete });
        return this.authService.getAuthenticatedRequest(path, requestOptions)
            .map(function () { return true; });
    };
    OneWeekStoryHttpService.prototype.createUrlParams = function (searchParams) {
        if (!searchParams) {
            return new http_1.URLSearchParams();
        }
        return Object.keys(searchParams)
            .reduce(function (urlParams, param) {
            if (searchParams[param]) {
                urlParams.append(param, searchParams[param]);
            }
            return urlParams;
        }, new http_1.URLSearchParams());
    };
    OneWeekStoryHttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_2.AuthenticationService])
    ], OneWeekStoryHttpService);
    return OneWeekStoryHttpService;
}());
exports.OneWeekStoryHttpService = OneWeekStoryHttpService;
//# sourceMappingURL=one-week-story-http.service.js.map