import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadDataComponent } from './load-data/load-data.component';
import { ExperimentComponent } from './experiment/experiment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadDataComponent,
    ExperimentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
