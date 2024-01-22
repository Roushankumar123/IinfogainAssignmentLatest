import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailviewComponent } from './components/detailview/detailview.component';

const routes: Routes = [
  {
    path: '',
    loadComponent:() => import('./components/home/home.component').then(c => c.HomeComponent)
    },
  { path: ':tab_identifier', component: DetailviewComponent },
  { path: '**', redirectTo: '/' }, // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
