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
var Rx_1 = require('rxjs/Rx');
var http_2 = require('./http');
var AuthenticationService = (function () {
    function AuthenticationService(http, session) {
        this.http = http;
        this.session = session;
        this.baseUrl = 'https://evening-badlands-77092.herokuapp.com';
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.session$ = new Rx_1.BehaviorSubject(session);
    }
    AuthenticationService.prototype.login = function (email, password, guestLogin) {
        var _this = this;
        if (guestLogin === void 0) { guestLogin = false; }
        return this.http.post(this.baseUrl + "/tokens", JSON.stringify({ email: email, password: password }), { headers: this.headers })
            .map(function (res) {
            var extractedData = _this.extractData(res);
            var token = extractedData.token;
            _this.session.token = token;
            _this.session.loggedIn = !guestLogin;
            _this.session.user = extractedData.user;
            _this.session$.next(_this.session);
            _this.headers.set('X-Authorization', token);
            _this.authenticationRequest$ = undefined;
            return extractedData.user;
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.getAuthenticatedRequest = function (path, requestOptions) {
        var _this = this;
        var url = this.baseUrl + "/" + path;
        if (!this.headers.has('X-Authorization')) {
            if (this.session.token) {
                this.headers.set('X-Authorization', this.session.token);
            }
            else if (!this.authenticationRequest$) {
                this.authenticationRequest$ = this.login('guest', 'guest', true);
            }
        }
        if (this.authenticationRequest$) {
            return this.authenticationRequest$
                .switchMap(function () { return _this.getRequestWithHeaders(url, requestOptions); });
        }
        else {
            return this.getRequestWithHeaders(url, requestOptions);
        }
    };
    AuthenticationService.prototype.clearSession = function () {
        this.headers.delete('X-Authorization');
        this.session.clearSession();
        this.session$.next(this.session);
    };
    AuthenticationService.prototype.getRequestWithHeaders = function (url, requestOptions) {
        var _this = this;
        requestOptions.headers = this.headers;
        return this.http.request(url, requestOptions)
            .map(function (res) { return _this.extractData(res); });
    };
    AuthenticationService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        return res.status === 204 ? '' : res.json();
    };
    AuthenticationService.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, http_2.Session])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map