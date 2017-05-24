import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SimulatorModule } from './simulator/simulator.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { Ng2GoogleChartModule } from 'ng2-googlechart';
import { DatepickerModule } from 'angular2-material-datepicker';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
  imports:
  [
    BrowserModule,
    FormsModule,
    HttpModule,    
    SimulatorModule,
    JsonpModule,
    DatepickerModule,
    Ng2GoogleChartModule,
    Ng2DatetimePickerModule,
    RouterModule.forRoot(
      []
    )
  ],
  declarations:
  [
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
