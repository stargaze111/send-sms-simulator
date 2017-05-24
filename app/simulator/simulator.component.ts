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
    model: SendSMSModel = new SendSMSModel('0426706255', 'Buy anything from our Uniqlo store in Westfield, Parramatta this weekend & receive 10 % off.')
    
    private clientId: string = '7Ok9bKbKed4AnChaSVe1QU3YRgFOj1mf';
    private baseApiUrl = 'https://apac-demo3-test.apigee.net/v1/messagingservices/';
    private sendSMSPath = 'send/sms';    

    private transactions: any = {};
    
    private subscription : Subscription;

    private countSuccess: number = 0;
    
    private maxMessages: number = 5;
    
     private counter: number = 0;

    private countFailures: number = 0;

    private responseMessage : string = "";
    
    private stage: number = 1; 
    
    private isContinue : boolean = true;

  
    constructor(private _http:Http) {       
    }

    sendSMS(form: NgForm) {
        this.postRequest(this.model, this.clientId, this.baseApiUrl + this.sendSMSPath)
            .subscribe(
            data => {
                //console.log(data);
		                if(data!=null&&data.error!=null){
		                  this.countFailures++;
		                  this.responseMessage = data.error.message;
		                }else{
		                  this.countSuccess++;
		                  this.responseMessage = "success";
                }
            },error => {
                //console.log(error);
                this.countFailures++;
                this.responseMessage = error;
            }
            )
    }


    runSimulation() {
        this.reset();
        let relativePath = 'send/sms';
        this.subscription = Observable
            .interval(1000)
            .flatMap(() => {    
                  this.isContinue = (this.counter<this.maxMessages);
                  this.counter++;
                  return this.postRequest(this.model, this.clientId, this.baseApiUrl + relativePath);
               
            }).subscribe(
            data => {
                //console.log(data);
                if(data!=null&&data.error!=null){
                  this.countFailures++;
                  this.responseMessage = data.error.message;
                  console.log("responseMessage : "+this.responseMessage);
                }else{
                  this.countSuccess++;
                  this.responseMessage = "success";
                }
                
                
            },error => {
                //console.log(error);
                this.countFailures++;
                this.responseMessage = error;
            }
            )

    }

    postRequest(postModel:any, clientId:string, url: string ){
           if(!this.isContinue){
             this.countFailures--;
           //this.subscription.unsubscribe(); 
           return Observable.throw("Reached the maximum number of messages requested.");
           
           }
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
            .catch(this.handleError);
        
  }
    
    reset() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }
        
        this.countSuccess = 0;
        this.countFailures = 0;
        this.responseMessage = "";
        this.counter =0;
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