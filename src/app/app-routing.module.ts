import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GridComponent} from "./grid/grid.component";
import {EditComponent} from "./edit/edit.component";

const routes: Routes = [
  {path:'templates',component:GridComponent},
  {path:'templates/:id',component:EditComponent},
  {path:'',pathMatch:'full',redirectTo:'templates'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
