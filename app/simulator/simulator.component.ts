import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { SendSMSModel } from '../models/sendsms.model'
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

@Component({
    selector: 'simulate',
    moduleId: module.id,
    templateUrl: './simulator.component.html',



})
export class SimulatorComponent {

    stopSim: any = { Value: false };
    worker: Worker;
    model: SendSMSModel = new SendSMSModel('0426706255', 'Buy anything from our Uniqlo store in Westfield, Parramatta this weekend & receive 10 % discount.')
    
    private clientId: string = 'UMPB1q9XBKudOD58cyVYACOp22a5OjgY';
    private baseApiUrl = 'https://apac-demo3-test.apigee.net/v1/messagingservices/';
    private sendSMSPath = 'send/sms';    

    private transactions: any = {};
    
    private subscription : Subscription;

    private countSuccess: number = 0;

    private countFailures: number = 0;

    private responseMessage : string = "";
    
    private stage: number = 1; 

  
    constructor(private _http:Http) {       
    }

    sendSMS(form: NgForm) {
        this.postRequest(this.model, this.clientId, this.baseApiUrl + this.sendSMSPath)
            .subscribe(
            data => {
                console.log(data);
                this.countSuccess++;
                this.responseMessage = data;
            },error => {
                console.log(error);
                this.countFailures++;
                this.responseMessage = error;
            }
            )
    }


    runSimulation() {
        let relativePath = 'send/sms';
        this.subscription = Observable
            .interval(1000)
            .flatMap(() => {                
                return this.postRequest(this.model, this.clientId, this.baseApiUrl + relativePath);
            }).subscribe(
            data => {
                console.log(data);
                this.countSuccess++;
                this.responseMessage = data;
            },error => {
                console.log(error);
                this.countFailures++;
                this.responseMessage = error;
            }
            )

    }

    postRequest(postModel:any, clientId:string, url: string ){
           
            let headers = new Headers(
                    { 'Content-Type': 'application/json',
                    'client_id': clientId }
                    );
    
          let options = new RequestOptions({ headers: headers });
          let body = JSON.stringify(postModel);
       
           return this._http.post(url, body, options)
            .map( data => {
                    return data.json();
                }
                )
            .catch(this.handleError)
        
  }
    
    reset() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }
        
        this.countSuccess = 0;
        this.countFailures = 0;
        this.responseMessage = "";
    }

    stopSummary() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }

    }
    
      private extractData(res: Response) {
         
          let body = res.json();
          return body ||{};
    
      }
    
        private handleError(error:any){
            console.log(error);
            return Observable.throw(error.json().error || 'Server Error');
    }
} 