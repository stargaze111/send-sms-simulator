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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var simulator_component_1 = require('./simulator/simulator.component');
var simulator_module_1 = require('./simulator/simulator.module');
var common_1 = require('@angular/common');
var http_2 = require('@angular/http');
var ng2_googlechart_1 = require('ng2-googlechart');
var angular2_material_datepicker_1 = require('angular2-material-datepicker');
var ng2_datetime_picker_1 = require('ng2-datetime-picker');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                simulator_module_1.SimulatorModule,
                http_2.JsonpModule,
                angular2_material_datepicker_1.DatepickerModule,
                ng2_googlechart_1.Ng2GoogleChartModule,
                ng2_datetime_picker_1.Ng2DatetimePickerModule,
                router_1.RouterModule.forRoot([
                    { path: 'simulator', component: simulator_component_1.SimulatorComponent },
                    { path: '', redirectTo: 'simulator', pathMatch: 'full' }
                ])
            ],
            declarations: [],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map