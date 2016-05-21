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
var Session = (function () {
    function Session() {
    }
    Object.defineProperty(Session.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (value) {
            this._token = value;
            this.setInLocalStorage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "loggedIn", {
        get: function () {
            return this._loggedIn;
        },
        set: function (value) {
            this._loggedIn = value;
            this.setInLocalStorage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            this._user = value;
            this.setInLocalStorage();
        },
        enumerable: true,
        configurable: true
    });
    Session.prototype.clearSession = function () {
        this._token = null;
        this._loggedIn = null;
        this._user = null;
        localStorage.removeItem('session');
    };
    Session.prototype.persist = function () {
        var sessionData = localStorage.getItem('session');
        if (sessionData !== null) {
            var session = JSON.parse(sessionData);
            this._loggedIn = session.loggedIn;
            this._token = session.token;
            this._user = session.user;
        }
    };
    Session.prototype.setInLocalStorage = function () {
        var sessionData = JSON.stringify({ token: this._token, loggedIn: this._loggedIn, user: this._user });
        localStorage.setItem('session', sessionData);
    };
    Session = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Session);
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.js.map