import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { SendSMSModel } from '../models/post-qoute.model'
import { Observable, Observer, Subscription } from 'rxjs/Rx';


@Component({
    selector: 'simulate',
    moduleId: module.id,
    templateUrl: './simulator.component.html',



})
export class SimulatorComponent {

    stopSim: any = { Value: false };
    worker: Worker;
    model: SendSMSModel = new SendSMSModel('0426706255', 'Buy anything from our Uniqlo store in Westfield, Parramatta this weekend & receive 10 % discount.')
    
    clientId: string = 'UMPB1q9XBKudOD58cyVYACOp22a5OjgY';
    private baseApiUrl = 'https://apac-demo3-test.apigee.net/v1/messagingservices/';
    private sendSMSPath = 'send/sms';    

    private transactions: any = {};
    
    private subscription : Subscription;

    private countSuccess: number = 0;

    private countFailures: number = 0;


    private stage: number = 1; 

  
    constructor() {       
    }

    sendSMS(form: NgForm) {
        this.postRequest(this.model, this.clientId, this.baseApiUrl + this.sendSMSPath)
            .subscribe(
            data => {
                console.log(data);
                this.countSuccess++;
            },error => {
                console.log(data);
                this.countFailures++;
            }
            )
    }


    runSimulation() {
        let relativePath = 'send/sms';
        this.subscription = Observable
            .interval(1000)
            .flatMap(() => {                
                return this.postRequest(this.model, clientId, this.baseApiUrl + relativePath);
            }).subscribe(
            data => {
                console.log(data);
                this.countSuccess++;
            },error => {
                console.log(data);
                this.countFailures++;
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
        
        this.countPolicies = 0;
        this.countQuotes = 0;
    }

    stopSummary() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
            console.log('stop Sim');
        }

    }
} 