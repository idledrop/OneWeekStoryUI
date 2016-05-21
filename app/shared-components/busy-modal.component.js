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
var primeng_1 = require('primeng/primeng');
var BusyModalComponent = (function () {
    function BusyModalComponent() {
    }
    BusyModalComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input('header'), 
        __metadata('design:type', String)
    ], BusyModalComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input('visible'), 
        __metadata('design:type', Boolean)
    ], BusyModalComponent.prototype, "visible", void 0);
    BusyModalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'busy-modal',
            template: "\n    <p-dialog [header]=\"header\" [(visible)]=\"visible\" modal=\"modal\" [closable]=\"false\" [closeOnEscape]=\"false\">\n      <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i> Please Wait...\n    </p-dialog>\n  ",
            directives: [primeng_1.Dialog]
        }), 
        __metadata('design:paramtypes', [])
    ], BusyModalComponent);
    return BusyModalComponent;
}());
exports.BusyModalComponent = BusyModalComponent;
//# sourceMappingURL=busy-modal.component.js.map