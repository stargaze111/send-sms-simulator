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
var sendsms_model_1 = require('../models/sendsms.model');
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/Rx');
var SimulatorComponent = (function () {
    function SimulatorComponent(_http) {
        this._http = _http;
        this.stopSim = { Value: false };
        this.model = new sendsms_model_1.SendSMSModel('0426706255', 'Buy anything from our Uniqlo store in Westfield, Parramatta this weekend & receive 10 % discount.');
        this.clientId = 'UMPB1q9XBKudOD58cyVYACOp22a5OjgY';
        this.baseApiUrl = 'https://apac-demo3-test.apigee.net/v1/messagingservices/';
        this.sendSMSPath = 'send/sms';
        this.transactions = {};
        this.countSuccess = 0;
        this.countFailures = 0;
        this.responseMessage = "";
        this.stage = 1;
    }
    SimulatorComponent.prototype.sendSMS = function (form) {
        var _this = this;
        this.postRequest(this.model, this.clientId, this.baseApiUrl + this.sendSMSPath)
            .subscribe(function (data) {
            console.log(data);
            _this.countSuccess++;
            _this.responseMessage = data;
        }, function (error) {
            console.log(error);
            _this.countFailures++;
            _this.responseMessage = error;
        });
    };
    SimulatorComponent.prototype.runSimulation = function () {
        var _this = this;
        var relativePath = 'send/sms';
        this.subscription = Rx_1.Observable
            .interval(1000)
            .flatMap(function () {
            return _this.postRequest(_this.model, _this.clientId, _this.baseApiUrl + relativePath);
        }).subscribe(function (data) {
            console.log(data);
            _this.countSuccess++;
            _this.responseMessage = data;
        }, function (error) {
            console.log(error);
            _this.countFailures++;
            _this.responseMessage = error;
        });
    };
    SimulatorComponent.prototype.postRequest = function (postModel, clientId, url) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'client_id': clientId });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(postModel);
        return this._http.post(url, body, options)
            .map(function (data) {
            return data.json();
        })
            .catch(this.handleError);
    };
    SimulatorComponent.prototype.reset = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }
        this.countSuccess = 0;
        this.countFailures = 0;
        this.responseMessage = "";
    };
    SimulatorComponent.prototype.stopSummary = function () {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }
    };
    SimulatorComponent.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    SimulatorComponent.prototype.handleError = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(error.json().error || 'Server Error');
    };
    SimulatorComponent = __decorate([
        core_1.Component({
            selector: 'simulate',
            moduleId: module.id,
            templateUrl: './simulator.component.html',
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SimulatorComponent);
    return SimulatorComponent;
}());
exports.SimulatorComponent = SimulatorComponent;
//# sourceMappingURL=simulator.component.js.map