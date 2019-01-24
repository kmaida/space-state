import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BiggerFasterComponent } from './pages/bigger-faster/bigger-faster.component';
import { MiniComponent } from './pages/mini/mini.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bigger-faster',
    component: BiggerFasterComponent
  },
  {
    path: 'mini',
    component: MiniComponent
  },
  {
    path: '*',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
