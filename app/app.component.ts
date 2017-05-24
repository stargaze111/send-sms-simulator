import { Component } from '@angular/core';


@Component({
    selector: 'pm-app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    providers: [   ]

})
export class AppComponent {
    pageTitle: string = 'Send SMS Simulator';
   
    
    public isCollapsed: boolean = true;
    

    markSimulatorSelected(){
   
    this.simulatorSelected = true;    
    }    
    
    
    constructor(){
        console.log("constructor!");        
    }


}