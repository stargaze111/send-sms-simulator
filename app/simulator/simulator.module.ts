

import {NgModule} from '@angular/core'
import {RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';

import {SimulatorComponent} from './simulator.component';
import {SharedModule} from '../shared/shared.module';

@NgModule(
  {
      declarations:[
        SimulatorComponent,
      ],
      imports:[
        RouterModule.forChild(
            [
                {path: 'simulator', component: SimulatorComponent}
            ]
        ),
        SharedModule
      ],
  }  
)
export class SimulatorModule{

}