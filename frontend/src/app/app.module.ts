import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadDataComponent } from './load_data/load_data.component';
import { ExperimentComponent } from './experiment/experiment.component';
import { ParsingDataComponent } from './parsing-data/parsing-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadDataComponent,
    ExperimentComponent,
    ParsingDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
