import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { AuthGuard } from './shared/guards/auth.guard';

//Components
import { ErrorComponent } from './components/error/error.component';



const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: "./modules/home/home.module#HomeModule"
  },
  {
    path: "",
    loadChildren: "./modules/user/user.module#UserModule",
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: ErrorComponent
  },
  {
    path: "**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }