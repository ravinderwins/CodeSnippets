import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: "./modules/layout/layout.module#LayoutModule"
  },
  {
    path: "login/:redirect",
    loadChildren: "./modules/login/login.module#LoginModule"
  },
  {
    path: "login",
    loadChildren: "./modules/login/login.module#LoginModule"
  },
  {
    path: "signup",
    loadChildren: "./modules/signup/signup.module#SignupModule"
  },
  {
    path: "forgot-password",
    loadChildren:
      "./modules/forgot-password/forgot-password.module#ForgotPasswordModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {}
