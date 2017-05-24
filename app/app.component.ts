import { Component } from '@angular/core';


@Component({
    selector: 'pm-app',
    moduleId: module.id,
    templateUrl: './app.component.html'    

})
export class AppComponent {
    pageTitle: string = 'Send SMS Simulator';
   
    
    public isCollapsed: boolean = true;
    public simulatorSelected: boolean = true;

    markSimulatorSelected(){
   
    this.simulatorSelected = true;    
    }    
    
    
    constructor(){
        console.log("constructor!");        
    }


}
