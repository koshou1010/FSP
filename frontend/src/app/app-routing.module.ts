import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentComponent } from './experiment/experiment.component';
import { LoadDataComponent } from './load_data/load_data.component';
import { ParsingDataComponent } from './parsing-data/parsing-data.component';


const routes: Routes = [
 //{path : '', redirectTo: '/', pathMatch: 'full'},
  {path : 'experiment', component:ExperimentComponent},
  { path: 'load_data', component: LoadDataComponent },
  { path: 'parsing-data', component: ParsingDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
