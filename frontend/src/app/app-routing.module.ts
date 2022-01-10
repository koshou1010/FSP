import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentComponent } from './experiment/experiment.component';
import { LoadDataComponent } from './load_data/load_data.component';


const routes: Routes = [
 //{path : '', redirectTo: '/', pathMatch: 'full'},
  { path: 'load_data', component:LoadDataComponent},
  {path : 'experiment', component:ExperimentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
